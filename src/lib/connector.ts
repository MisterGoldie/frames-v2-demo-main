import { getFrameMessage } from "frames.js";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { Config, createConfig, fallback, http as wagmiHttp } from "wagmi";

const transport = http("https://base.publicnode.com");

const publicClient = createPublicClient({
  chain: base,
  transport,
});

export const config: Config = createConfig({
  chains: [base],
  transports: {
    [base.id]: fallback([wagmiHttp()]),
  },
});

export type FrameMessage = ReturnType<typeof getFrameMessage>;

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
