import React, {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState
} from 'react';
import styles from './autoslider.module.scss';
import { Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
  delay?: number;
  showButtons?: boolean;
  children: ReactNode | ReactNode[];
}

const AutoSlider: React.FC<AutoSliderProps> = ({
  children,
  delay = 5000,
  showButtons = true
}) => {
  const [index, setIndex] = useState<number>(0);
  const [length, setLength] = useState((children as ReactNode[]).length);

  const nextSlide = () => {
    setIndex((oldIndex) => {
      return (oldIndex + 1) % length;
    });
  };

  const prevSlide = () => {
    setIndex((oldIndex) => {
      return (oldIndex - 1 + length) % length;
    });
  };

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
    }, delay);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className={styles.section}>
      {showButtons && <div className={styles.buttons}>
        <Button onClick={prevSlide}><ArrowBackIosNewIcon /></Button>
        <Button onClick={nextSlide}><ArrowForwardIosIcon /></Button>
      </div>}
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
              position: 'absolute'
            }
          });
        })}
      </div>
    </div>
  );
};

export default AutoSlider;
