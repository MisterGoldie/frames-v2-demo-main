import { NextRequest } from "next/server";
import { FrameData, GameState, CellValue } from "~/types/game";

const appUrl = process.env.NEXT_PUBLIC_URL;

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  moveCount: 0,
  gameStarted: false
};

interface Button {
  title: string;
  action: {
    type: string;
    url: string;
  }
}

function checkWinner(board: (CellValue)[]): CellValue | 'draw' | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  const data = await req.json() as FrameData;
  const { gameState, buttonIndex = 0 } = data;

  let newState = gameState || initialState;
  let buttons: Button[] = [];

  if (!newState.gameStarted && buttonIndex === 0) {
    newState = { ...initialState, gameStarted: true };
    buttons = [
      {
        title: "Reset Game",
        action: {
          type: "post",
          url: `${appUrl}/api/frame/tictactoe`
        }
      },
      ...Array(9).fill(null).map((_, index) => ({
        title: `${index + 1}`,
        action: {
          type: "post",
          url: `${appUrl}/api/frame/tictactoe`
        }
      }))
    ];
  } else if (newState.gameStarted) {
    if (buttonIndex === 1) {
      newState = initialState;
      buttons = [{
        title: "Start New Game",
        action: {
          type: "post",
          url: `${appUrl}/api/frame/tictactoe`
        }
      }];
    } else if (!newState.winner && buttonIndex > 1) {
      const position = buttonIndex - 2;
      if (position >= 0 && position < 9 && !newState.board[position]) {
        const newBoard = [...newState.board];
        newBoard[position] = newState.currentPlayer;
        
        const winner = checkWinner(newBoard);
        const moveCount = newState.moveCount + 1;

        newState = {
          board: newBoard,
          currentPlayer: newState.currentPlayer === 'X' ? 'O' : 'X',
          winner: moveCount === 9 && !winner ? 'draw' : winner,
          moveCount
        };
      }
    }
  }

  return new Response(
    JSON.stringify({
      version: "next",
      imageUrl: `${appUrl}/api/frame/tictactoe/image?state=${encodeURIComponent(JSON.stringify(newState))}`,
      buttons,
      state: newState
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
} 