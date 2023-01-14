import { Direction, Position } from 'components/interface';

const getPositionOnDirection = (el: HTMLDivElement, direction: Direction): Position => {
  const rect = el.getBoundingClientRect();

  const sides = {
    right: {
      x: rect.width * 0.98,
      y: random(0, rect.height),
    },
    left: {
      x: 0,
      y: random(0, rect.height),
    },
  };
  switch (direction) {
    case Direction.R:
      return sides.left;

    case Direction.L:
      return sides.right;

    default:
      break;
  }

  return {
    x: rect.width - 25,
    y: rect.height - 30,
  };
};

export default getPositionOnDirection;
const random = (min = 0, max = 0) => Math.random() * (max - min) + min;
