import { Direction, KIND, Position, RspItem } from 'components/interface';

export const getRandomSpeed = () => random(2000, 4000);
export const random = (min = 0, max = 0) => Math.random() * (max - min) + min;
export const getRandomDir = (direction: Direction) => {
  const directions = [Direction.D, Direction.L, Direction.R, Direction.U].filter(
    (item) => item !== direction,
  );

  return directions[Math.floor(Math.random() * directions.length)];
};
export const getInitialOffset = (kind: string, parent: HTMLDivElement) => {
  let offset = { x: 0, y: 0 };
  switch (kind) {
    case KIND.scissors:
      offset = { x: 0, y: 0 };
      break;
    case KIND.rock:
      offset = { x: parent.clientWidth, y: 0 };
      break;
    default:
      offset = { y: parent.clientHeight, x: parent.clientWidth / 2 };
      break;
  }
  return offset;
};

export const getDirection = (el: HTMLDivElement, direction: Direction): Position => {
  const rect = el.getBoundingClientRect();
  const sides = {
    [Direction.R]: {
      x: rect.width * 0.98,
      y: random(0, rect.height),
    },
    [Direction.L]: {
      x: 0,
      y: random(0, rect.height),
    },
    [Direction.D]: {
      x: random(0, rect.width),
      y: rect.height * 0.98,
    },
    [Direction.U]: {
      x: random(0, rect.width),
      y: 0,
    },
  };
  return sides[direction];
};

export const getLoser = (a: RspItem, b: RspItem) => {
  let loserId = null;
  let tie = false;

  if (a.kind === b.kind) {
    tie = true;
  }

  if (a.kind === KIND.paper && b.kind === KIND.scissors) {
    loserId = a.id;
  }

  if (a.kind === KIND.scissors && b.kind === KIND.rock) {
    loserId = a.id;
  }

  if (a.kind === KIND.rock && b.kind === KIND.paper) {
    loserId = a.id;
  }

  if (b.kind === KIND.paper && a.kind === KIND.scissors) {
    loserId = b.id;
  }

  if (b.kind === KIND.scissors && a.kind === KIND.rock) {
    loserId = b.id;
  }

  if (b.kind === KIND.rock && a.kind === KIND.paper) {
    loserId = b.id;
  }
  return { loserId, tie };
};
