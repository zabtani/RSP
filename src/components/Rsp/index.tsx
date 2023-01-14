import styled from 'styled-components';
import { RefObject, useEffect, useRef, useState, forwardRef } from 'react';
import { Direction, KIND, RspItem } from 'components/interface';
import Item from './item';

const Rsp = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const ini = [
    {
      id: 0,
      direction: Direction.R,
      kind: KIND.paper,
      ref: useRef(null),
    },
    {
      id: 1,
      direction: Direction.R,
      kind: KIND.rock,
      ref: useRef(null),
    },
    {
      id: 2,
      direction: Direction.R,
      kind: KIND.scissors,
      ref: useRef(null),
    },
  ];
  const [startCompare, setStartCompare] = useState<boolean>(false);
  const [items, setItems] = useState<RspItem[]>(ini);
  const [parent, setParent] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setParent(parentRef.current);
  }, []);

  const onPathCompleted = (id: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            direction: item.direction === Direction.L ? Direction.R : Direction.L,
          };
        }
        return item;
      }),
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartCompare(true);
    }, 4000);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const r1 = items[0];
    const r2 = items[1];
    const r3 = items[2];

    const trackPosition = (first: RspItem, sec: RspItem) => {
      const div1Rect = first.ref.current?.getBoundingClientRect();
      const div2Rect = sec.ref.current?.getBoundingClientRect();

      if (
        div1Rect.left < div2Rect.right &&
        div1Rect.right > div2Rect.left &&
        div1Rect.top < div2Rect.bottom &&
        div1Rect.bottom > div2Rect.top
      ) {
        const { loserId, tie } = getLoser(first, sec);
        if (!tie) {
          console.log('c');
          setItems((prev) =>
            prev.map((item) => {
              if (item.id === loserId) {
                return {
                  ...item,
                  kind: loserId === sec.id ? first.kind : sec.kind,
                };
              }
              return item;
            }),
          );
        }
      }
    };

    const intervalId = setInterval(() => {
      if (startCompare) {
        trackPosition(r1, r2);
        trackPosition(r1, r3);

        trackPosition(r2, r1);
        trackPosition(r2, r3);

        trackPosition(r3, r1);
        trackPosition(r3, r2);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [startCompare, items]);
  return (
    <MainContainer ref={parentRef}>
      {parent
        ? items.map((props, index) => (
            <Item onPathCompleted={onPathCompleted} key={props.id} parent={parent} {...props} />
          ))
        : null}
    </MainContainer>
  );
};

export default Rsp;

const MainContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  margin: 0 2% 2% 0;
  height: 50vh;
  width: 50vw;
`;

const getLoser = (a: RspItem, b: RspItem) => {
  let loserId = null;
  let tie = false;
  // tie
  if (a.kind === b.kind) {
    tie = true;
  }
  //  a
  if (a.kind === KIND.paper && b.kind === KIND.scissors) {
    loserId = a.id;
  }

  if (a.kind === KIND.scissors && b.kind === KIND.rock) {
    loserId = a.id;
  }

  if (a.kind === KIND.rock && b.kind === KIND.paper) {
    loserId = a.id;
  }

  //  b
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
