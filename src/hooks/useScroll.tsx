import { useEffect, useState, RefObject } from 'react';

type FnVoid = () => void;

export default function useScroll(ref: RefObject<any>): {
  isVisible: boolean;
  scroll: { left: FnVoid; right: FnVoid; stop: FnVoid };
} {
  const [isVisible, setIsVisible] = useState(false);

  const checkVisible = () => {
    const lis = ref.current!.getElementsByTagName('li');
    const length = ref.current!.clientWidth;
    const offsetLeft = lis[lis.length - 1].offsetLeft;
    const offsetWidth = lis[lis.length - 1].offsetWidth;
    if (length <= offsetLeft + offsetWidth) setIsVisible(true);
  };

  useEffect(() => {
    const instance = ref.current;
    instance.addEventListener('mouseover', checkVisible);
    return () => {
      instance.removeEventListener('mouseover', checkVisible);
    };
  });

  let scroller;

  const scrollRight = () => {
    scroller = setInterval(() => (ref.current!.scrollLeft += 10), 15);
  };
  const scrollLeft = () => {
    scroller = setInterval(() => (ref.current!.scrollLeft -= 10), 15);
  };
  const stopScroll = () => {
    clearInterval(scroller);
  };

  const scroll = { left: scrollLeft, right: scrollRight, stop: stopScroll };

  return { isVisible, scroll };
}
