import { Metadata } from "next";
import App from "./app";

const appUrl = process.env.NEXT_PUBLIC_URL;

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

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "POD Play v2",
    openGraph: {
      title: "POD Play v2",
      description: "Our POD Play demo",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}
////