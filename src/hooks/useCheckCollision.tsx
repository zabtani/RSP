import { KIND, RspItem } from 'components/interface';
import { getLoser } from 'components/Rsp/utils';
import { useEffect, Dispatch, SetStateAction, useState } from 'react';

const useCheckCollision = (setItems: Dispatch<SetStateAction<RspItem[]>>, items: RspItem[]) => {
  const [counts, setCounts] = useState<Record<any, number>>({
    [KIND.paper]: 0,
    [KIND.rock]: 0,
    [KIND.scissors]: 0,
  });

  useEffect(() => {}, []);

  useEffect(() => {
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
      count();
      items.forEach((item) => {
        items.forEach((comparedItem) => {
          if (item.id !== comparedItem.id) {
            trackPosition(item, comparedItem);
          }
        });
      });
    }, 50);

    const count = () => {
      const currCount = items
        .map((items) => items.kind)
        .reduce((map, val) => {
          const result = { ...map };
          result[val] = (result[val] || 0) + 1;
          return result;
        }, {} as Record<any, number>);
      setCounts(currCount);
    };

    return () => {
      clearInterval(intervalId);
    };
  }, [items]);

  return counts;
};

export default useCheckCollision;
