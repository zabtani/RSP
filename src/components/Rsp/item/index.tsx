import { Direction, Position, RspItem } from 'components/interface';
import {
  RefObject,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useMemo,
  PropsWithChildren,
  useCallback,
} from 'react';
import styled from 'styled-components';
import getDirection from './position-utils';

interface Props extends RspItem {
  parent: HTMLDivElement;
  onPathCompleted: (id: number) => void;
}

const Item = forwardRef(({ kind, parent, direction, id, onPathCompleted }: Props, ref: any) => {
  const [currentOffset, setOffset] = useState({ x: 0, y: 0 });

  const poo = useCallback((id: number) => onPathCompleted(id), []);

  useEffect(() => {
    const offset = getDirection(parent, direction);
    setOffset(offset);

    const timer = setTimeout(() => poo(id), 5500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [direction, id, poo]);

  return (
    <Container ref={ref} offset={currentOffset}>
      <Kind>{kind}</Kind>
    </Container>
  );
});
export default Item;

const Container = styled.div<{ offset: Position }>`
  position: absolute;
  transition: transform 5.5s linear;
  transform: ${({ offset }) => `translate(${offset.x}px, ${offset.y}px)`};
`;

const Kind = ({ children }: PropsWithChildren) => <>{children}</>;
