import { RspItem } from 'components/interface';
import { getLoser } from 'components/Rsp/utils';
import { useEffect, Dispatch, SetStateAction } from 'react';

const useCheckCollision = (setItems: Dispatch<SetStateAction<RspItem[]>>, items: RspItem[]) => {
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
      items.forEach((item) => {
        items.forEach((comparedItem) => {
          if (item.id !== comparedItem.id) {
            trackPosition(item, comparedItem);
          }
        });
      });
    }, 50);
    return () => clearInterval(intervalId);
  }, [items]);
};

export default useCheckCollision;
