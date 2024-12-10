export type CellValue = 'X' | 'O' | null;
export type Board = CellValue[];

export interface GameState {
  [x: string]: any;
  board: Board;
  currentPlayer: 'X' | 'O';
  winner: CellValue | 'draw' | null;
  moveCount: number;
}

export interface FrameData {
  gameState: GameState;
  buttonIndex?: number;
  fid?: number;
} 