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

  return (
    <div className="h-screen w-full bg-purple-600 flex items-center justify-center">
      <Canvas>
        <color attach="background" args={['#7C65C1']} />
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
    </div>
  );
}

export default MenuBoard; 