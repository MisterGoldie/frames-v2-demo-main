"use client";

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import useSound from 'use-sound';

interface MenuBoardProps {
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard', piece: 'X' | 'O') => void;
  isMuted: boolean;
  toggleMute: () => void;
}

function MenuBoard({ onStartGame, isMuted, toggleMute }: MenuBoardProps) {
  const [menuStep, setMenuStep] = useState<'game' | 'piece' | 'difficulty'>('game');
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.5, soundEnabled: !isMuted });
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.5, soundEnabled: !isMuted });

  useEffect(() => {
    // Play background music or any other setup
  }, []);

  return (
    <div className="h-screen w-full bg-purple-600 flex items-center justify-center">
      <Canvas>
        <ambientLight intensity={0.5} />
        <Text
          position={[0, 1, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Main Menu
        </Text>
      </Canvas>
      <div className="absolute bottom-4 flex justify-between w-full px-8">
        <button onClick={toggleMute} className="bg-green-600 text-white px-4 py-2 rounded">
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button onClick={() => onStartGame('easy', 'X')} className="bg-blue-600 text-white px-4 py-2 rounded">
          Start Game
        </button>
      </div>
    </div>
  );
}

export default MenuBoard; 