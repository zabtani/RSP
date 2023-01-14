import { Direction, KIND } from 'components/interface';
import { getRandomDir, getRandomSpeed } from 'components/Rsp/utils';
import { useRef, MutableRefObject } from 'react';

const initialKindDirection: Record<string, Direction> = {
  [KIND.paper]: Direction.D,
  [KIND.rock]: Direction.R,
  [KIND.scissors]: Direction.L,
};

const useInitialItems = () => {
  const getItemsGroup = (
    count: number,
    kind: string,
    idPrefix: string,
    refs: MutableRefObject<any>[],
  ) =>
    Array.from({ length: count }, (_, i) => `${idPrefix}${i}`).map((id, idx) => ({
      id,
      direction: getRandomDir(initialKindDirection[kind]),
      kind,
      ref: refs[idx],
      speed: getRandomSpeed(),
    }));

  const ini = [
    ...getItemsGroup(6, KIND.paper, 'p', [
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
    ]),
    ...getItemsGroup(6, KIND.scissors, 's', [
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
    ]),
    ...getItemsGroup(6, KIND.rock, 'r', [
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
    ]),
  ];
  return ini;
};

export default useInitialItems;
