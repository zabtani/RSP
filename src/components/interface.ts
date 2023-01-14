import { MutableRefObject } from 'react';

export enum Direction {
  L = 'left',
  R = 'right',
  U = 'up',
  D = 'down',
}
const rock = '🧱' as '🧱';
const paper = '📄' as '📄';
const scissors = '✂️' as '✂️';
export const KIND = { rock, paper, scissors };
export type Position = { x: number; y: number };
export interface RspItem {
  direction: Direction;
  id: string;
  kind: string;
  ref: MutableRefObject<HTMLDivElement>;
  speed: number;
}
