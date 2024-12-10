import { Metadata } from "next";
import dynamic from "next/dynamic";

const appUrl = process.env.NEXT_PUBLIC_URL;

const TicTacToe = dynamic(() => import("~/components/TicTacToe"), {
  ssr: false,
});

const frame = {
  version: "vNext",
  image: `${appUrl}/api/frame/tictactoe/image`,
  buttons: [
    {
      label: "Start New Game",
      action: "post"
    }
  ],
  postUrl: `${appUrl}/api/frame/tictactoe`
};

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "A Farcaster Frame Tic Tac Toe game",
  openGraph: {
    title: "Tic Tac Toe",
    description: "Play Tic Tac Toe in a Farcaster Frame",
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function TicTacToePage() {
  return <TicTacToe />;
} 