"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import { Button } from "~/components/ui/Button";

interface DemoProps {
  title?: string;
}

export default function Demo({ title = "Frames v2 Demo" }: DemoProps) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext | undefined>();
  const [isContextOpen, setIsContextOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setContext(await sdk.context);
        sdk.actions.ready({});
      } catch (error) {
        console.error('Failed to load SDK context:', error);
      }
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const toggleContext = useCallback(() => {
    setIsContextOpen((prev) => !prev);
  }, []);

  const openUrl = useCallback(() => {
    sdk.actions.openUrl("https://podplayv2.vercel.app");
  }, []);

  const close = useCallback(() => {
    sdk.actions.close();
  }, []);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>

      <div className="mb-4">
        <h2 className="font-2xl font-bold">Context</h2>
        <button
          onClick={toggleContext}
          className="flex items-center gap-2 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
        >
          <span
            className={`transform transition-transform ${
              isContextOpen ? "rotate-90" : ""
            }`}
          >
            ➤
          </span>
          Tap to expand
        </button>

        {isContextOpen && (
          <div className="p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-auto">
              {JSON.stringify(context, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-2xl font-bold">Actions</h2>

        <div className="mb-4">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
            <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-auto">
              sdk.actions.openUrl
            </pre>
          </div>
          <Button onClick={openUrl}>Open Link</Button>
        </div>

        <div className="mb-4">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
            <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-auto">
              sdk.actions.close
            </pre>
          </div>
          <Button onClick={close}>Close Frame</Button>
        </div>
      </div>
    </div>
  );
}
