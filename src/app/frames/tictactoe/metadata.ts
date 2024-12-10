import { Metadata } from "next";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "vNext",
  image: `${appUrl}/api/frame/tictactoe/image`,
  buttons: [
    {
      label: "Start Game",
      action: "post"
    }
  ],
  state: {
    gameStarted: false,
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    moveCount: 0
  }
};

export const metadata: Metadata = {
  title: "POD Play Tic-Tac-Toe",
  description: "Play Tic-Tac-Toe on Farcaster",
  openGraph: {
    title: "POD Play Tic-Tac-Toe",
    description: "Play Tic-Tac-Toe on Farcaster",
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
}; 