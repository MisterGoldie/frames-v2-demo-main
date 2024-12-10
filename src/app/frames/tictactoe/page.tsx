"use client";

import MenuBoard from "~/components/MenuBoard";

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