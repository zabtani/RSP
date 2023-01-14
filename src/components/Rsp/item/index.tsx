import { Position, RspItem } from 'components/interface';
import { useEffect, useState, forwardRef, useCallback } from 'react';
import styled from 'styled-components';
import { getDirection, getInitialOffset } from '../utils';

interface Props extends RspItem {
  parent: HTMLDivElement;
  onPathCompleted: (id: string) => void;
}

const Item = forwardRef(
  ({ kind, parent, direction, id, speed, onPathCompleted }: Props, ref: any) => {
    const [currentOffset, setOffset] = useState(getInitialOffset(kind, parent));
    const setNewDirection = useCallback((id: string) => onPathCompleted(id), []);

    useEffect(() => {
      const offset = getDirection(parent, direction);
      setOffset(offset);
      const timer = setTimeout(() => setNewDirection(id), speed);
      return () => {
        window.clearTimeout(timer);
      };
    }, [direction, id, setNewDirection, speed]);

    return (
      <Container ref={ref} speed={speed} offset={currentOffset}>
        {kind}
      </Container>
    );
  },
);
export default Item;

const Container = styled.div<{ offset: Position; speed: number }>`
  position: absolute;
  transition: ${({ speed }) => `transform ${speed}ms linear `};
  transform: ${({ offset }) => `translate(${offset.x}px, ${offset.y}px)`};
`;
