import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import useCheckCollision from 'hooks/useCheckCollision';
import { RspItem } from 'components/interface';
import useInitialItems from 'hooks/useInitialItems';
import Item from './item';
import { getRandomDir, getRandomSpeed } from './utils';

const Rsp = () => {
  //const [winner, setWinner] = useState<null | string>(null);

  const ini = useInitialItems();
  const [items, setItems] = useState<RspItem[]>(ini);
  useCheckCollision(setItems, items);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [parent, setParent] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    setParent(parentRef.current);
  }, []);

  const onPathCompleted = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            direction: getRandomDir(item.direction),
            speed: getRandomSpeed(),
          };
        }
        return item;
      }),
    );
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const liveKinds = new Set(items.map((item) => item.kind));
  //     console.log(liveKinds.size);
  //     if (liveKinds.size === 1) {
  //       setWinner(liveKinds.values().next().value);
  //     }
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

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
  display: flex;
  flex-direction: column;
  margin: 0 2% 2% 0;
  margin: auto;
  height: 50vh;
  width: 50vw;
`;
