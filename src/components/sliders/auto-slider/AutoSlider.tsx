import React, {
  memo, ReactElement, ReactNode,
  Children,
  cloneElement,
  useEffect,
  useState
} from 'react';
import styles from './autoslider.module.scss';

const sliderStyles = {
  activeSlide: {
    opacity: '1',
    transform: 'translateX(0)'
  },
  lastSlide: {
    transform: 'translateX(-100%)'
  },
  nextSlide: {
    transform: 'translateX(100%)'
  }
};

type slideWithOpacity = { opacity?: string, transform: string }

interface AutoSliderProps {
  speed?: number;
  children: ReactNode | ReactNode[];
}

const AutoSlider: React.FC<AutoSliderProps> = ({ children, speed }) => {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState((children as ReactNode[]).length);
  const defaultIntervalSpeed = 5000;
  useEffect(() => {
    if (index < 0) {
      setIndex(length - 1);
    }
    if (index > length - 1) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, speed ? speed : defaultIntervalSpeed);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className={styles.section}>
      <div className={styles.menu}>
        {Children.map(children, (child, childIndex) => {

          let position: slideWithOpacity = sliderStyles.nextSlide;
          if (childIndex === index) {
            position = sliderStyles.activeSlide;
          }
          if (
            childIndex === index - 1 ||
            (index === 0 && childIndex === length - 1)
          ) {
            position = sliderStyles.lastSlide;
          }

          return cloneElement(child as ReactElement, {
            style: {
              ...position,
              opacity: position.opacity ? position.opacity : 0,
              transition: `all 0.3s linear`,
              position: 'absolute',
              width: '100%',
              height: '100%'
            }
          });
        })}
      </div>
    </div>
  );
};

export default memo(AutoSlider);
