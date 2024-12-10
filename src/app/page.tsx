import { Metadata } from "next";
import App from "./app";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/opengraph-image`,
  buttons: [
    {
      label: "Open YouTube",
      action: {
        type: "post_redirect",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
    },
    {
      label: "Open Warpcast",
      action: {
        type: "post_redirect",
        url: "https://warpcast.com/~/compose"
      }
    },
    {
      label: "Add Frame",
      action: {
        type: "post",
        url: `${appUrl}/api/frame/add`
      }
    }
  ]
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Farcaster Frames v2 Demo",
    openGraph: {
      title: "Farcaster Frames v2 Demo",
      description: "A Farcaster Frames v2 demo app.",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}
//