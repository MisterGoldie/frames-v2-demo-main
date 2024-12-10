import dynamic from "next/dynamic";
import { Metadata } from "next";

const appUrl = process.env.NEXT_PUBLIC_URL;

export const metadata: Metadata = {
  title: "POD Play v2",
  description: "A Farcaster Frame for POD Play",
  openGraph: {
    title: "POD Play v2",
    description: "A Farcaster Frame for POD Play",
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "vNext",
      image: `${appUrl}/opengraph-image`,
      buttons: [
        {
          label: "Open App",
          action: "post"
        },
        {
          label: "Close",
          action: "post"
        }
      ],
      postUrl: `${appUrl}/api/frame`
    })
  }
};

const Demo = dynamic(() => import("~/components/Demo"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col p-4">
      <Demo />
    </main>
  );
}
////