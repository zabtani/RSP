import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import useCheckCollision from 'hooks/useCheckCollision';
import { KIND, RspItem } from 'components/interface';
import useInitialItems from 'hooks/useInitialItems';
import Item from './item';
import { getRandomDir, getRandomSpeed } from './utils';

const Rsp = () => {
  const ini = useInitialItems();
  const [items, setItems] = useState<RspItem[]>(ini);
  const counts = useCheckCollision(setItems, items);
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

  return (
    <GameContainer>
      <ScoreContainer>
        <div>{`${KIND.paper}${counts[KIND.paper] ?? 0}`}</div>
        <div>{`${KIND.rock}${counts[KIND.rock] ?? 0}`}</div>
        <div>{`${KIND.scissors}${counts[KIND.scissors] ?? 0}`}</div>
      </ScoreContainer>
      <MainContainer ref={parentRef}>
        {parent
          ? items.map((props, index) => (
              <Item onPathCompleted={onPathCompleted} key={props.id} parent={parent} {...props} />
            ))
          : null}
      </MainContainer>
    </GameContainer>
  );
};

export default Rsp;

const GameContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
const ScoreContainer = styled.div`
  color: #0ea760;
  div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 10px 2px 10px 2px;
  }
  min-width: 50px;

  display: flex;
  flex-direction: column;
  width: 10%;
  height: 100%;
  background-color: #f0f8ff25;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 95%;
  width: 85%;
  overflow: hidden;
`;
