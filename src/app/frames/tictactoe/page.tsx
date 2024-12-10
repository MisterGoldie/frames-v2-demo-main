import { Metadata } from "next";
import dynamic from "next/dynamic";

const appUrl = process.env.NEXT_PUBLIC_URL;

const TicTacToe = dynamic(() => import("~/components/TicTacToe"), {
  ssr: false,
});

const frameEmbed = {
  version: "next",
  imageUrl: `${appUrl}/api/frame/tictactoe/image`,
  buttons: [
    {
      label: "Start New Game",
      action: "post"
    }
  ],
  postUrl: `${appUrl}/api/frame/tictactoe`
};

export const metadata: Metadata = {
  title: "POD Play Tic-Tac-Toe",
  description: "A Tic-Tac-Toe game presented by /thepod",
  openGraph: {
    title: "POD Play Tic-Tac-Toe",
    description: "Play Tic-Tac-Toe in a Farcaster Frame",
  },
  other: {
    "fc:frame": JSON.stringify(frameEmbed),
  },
};

const MenuBoard = dynamic(() => import('~/components/MenuBoard'), { ssr: false });

export default function TicTacToePage() {
  const handleStartGame = (
    difficulty: 'easy' | 'medium' | 'hard',
    piece: 'X' | 'O'
  ) => {
    console.log(`Starting game with difficulty: ${difficulty}, piece: ${piece}`);
  };

  return (
    <MenuBoard 
      onStartGame={handleStartGame} 
      isMuted={false} 
      toggleMute={() => {}} 
    />
  );
} 