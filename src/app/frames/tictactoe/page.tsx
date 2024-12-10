import { Metadata } from "next";
import dynamic from "next/dynamic";

const appUrl = process.env.NEXT_PUBLIC_URL;

const TicTacToe = dynamic(() => import("~/components/TicTacToe"), {
  ssr: false,
});

const frame = {
  version: "next",
  imageUrl: `${appUrl}/game-board.png`,
  button: {
    title: "Play Tic-Tac-Toe",
    action: {
      type: "launch_frame",
      name: "POD Play Tic-Tac-Toe",
      url: `${appUrl}/frames/tictactoe`,
      splashImageUrl: `${appUrl}/game-board.png`,
      splashBackgroundColor: "#1a1a1a"
    }
  }
};

export const metadata: Metadata = {
  title: "POD Play Tic-Tac-Toe",
  description: "A Tic-Tac-Toe game presented by /thepod",
  openGraph: {
    title: "POD Play Tic-Tac-Toe",
    description: "Play Tic-Tac-Toe in a Farcaster Frame",
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function TicTacToePage() {
  return <TicTacToe />;
} 