"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import { Button } from "~/components/ui/Button";

type CellValue = 'X' | 'O' | null;
type Board = CellValue[];

interface GameState {
  board: Board;
  currentPlayer: 'X' | 'O';
  winner: CellValue | 'draw';
  moveCount: number;
}

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  moveCount: 0
};

export default function TicTacToe() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [gameState, setGameState] = useState<GameState>(initialState);

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const startGame = useCallback(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/frame/tictactoe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameState: initialState }),
    })
    .then(response => response.json())
    .then(data => {
      setGameState(data.state);
    })
    .catch(error => {
      console.error('Error starting game:', error);
    });
  }, []);

  const makeMove = useCallback((position: number) => {
    setGameState(prev => {
      if (prev.board[position] || prev.winner) return prev;

      const newBoard = [...prev.board];
      newBoard[position] = prev.currentPlayer;
      
      const winner = checkWinner(newBoard);
      const moveCount = prev.moveCount + 1;

      return {
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        winner: moveCount === 9 && !winner ? 'draw' : winner,
        moveCount
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <h1 className="text-2xl font-bold text-center mb-4">Tic Tac Toe</h1>
      
      <div className="mb-4">
        <Button onClick={startGame} className="w-full mb-4">
          Start New Game
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {gameState.board.map((cell, index) => (
          <div 
            key={index}
            className={`
              h-20 flex items-center justify-center 
              text-2xl font-bold border-2 border-[#7C65C1] 
              rounded-lg cursor-pointer
              ${!cell && !gameState.winner ? 'hover:bg-[#7C65C1]/10' : ''}
            `}
            onClick={() => makeMove(index)}
          >
            {cell || ''}
          </div>
        ))}
      </div>

      {gameState.winner && (
        <div className="text-center font-bold">
          {gameState.winner === 'draw' 
            ? "It's a draw!" 
            : `Player ${gameState.winner} wins!`}
        </div>
      )}
    </div>
  );
}

function checkWinner(board: Array<'X' | 'O' | null>): 'X' | 'O' | 'draw' | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== null)) {
    return 'draw';
  }

  return null;
} 