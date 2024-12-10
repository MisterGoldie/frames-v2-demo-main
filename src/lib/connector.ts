import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { Config, createConfig, fallback, http as wagmiHttp, createConnector } from "wagmi";

// Extend FrameContext to include fid
interface ExtendedFrameContext extends FrameContext {
  fid?: number;
}

const transport = http("https://base.publicnode.com");

const publicClient = createPublicClient({
  chain: base,
  transport,
});

export const frameConnector = () => 
  createConnector((config) => ({
    id: 'frame',
    name: 'Frame',
    type: 'frame' as const,
    async connect({ chainId } = {}) {
      const chain = chainId ?? config.chains[0].id;
      return {
        accounts: ['0x0000000000000000000000000000000000000000'] as const,
        chainId: chain
      };
    },
    async disconnect() {},
    async getAccounts() {
      return ['0x0000000000000000000000000000000000000000'] as const; 
    },
    async getChainId() {
      return config.chains[0].id;
    },
    async isAuthorized() {
      try {
        const context = await sdk.context as ExtendedFrameContext;
        return !!context && !!context.fid;
      } catch (error) {
        console.error('Frame authorization error:', error);
        return false;
      }
    },
    async getProvider({ chainId }: { chainId?: number } = {}) {
      const chain = chainId ?? config.chains[0].id;
      return createPublicClient({
        chain: { ...base, id: chain },
        transport: http()
      });
    },
    onAccountsChanged() {},
    onChainChanged() {},
    onDisconnect() {}
  }));

export const config: Config = createConfig({
  chains: [base],
  transports: {
    [base.id]: fallback([wagmiHttp()]),
  },
  connectors: [frameConnector()]
});

export type FrameMessage = {
  untrustedData: any;
  trustedData: any;
};

export const validateFrameMessage = async (
  message: FrameMessage
): Promise<boolean> => {
  try {
    // Add your frame message validation logic here
    return true;
  } catch (e) {
    console.error("Error validating frame message:", e);
    return false;
  }
};

export const isFrameMessage = (x: unknown): x is FrameMessage => {
  return (
    typeof x === "object" &&
    x !== null &&
    "untrustedData" in x &&
    "trustedData" in x
  );
};

export const isValidFrameMessage = async (x: unknown): Promise<boolean> => {
  return isFrameMessage(x) && await validateFrameMessage(x);
};
