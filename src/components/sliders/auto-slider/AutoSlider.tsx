import React, { memo, useEffect, useState } from 'react';
import styles from './autoslider.module.scss';

const sliderStyles = {
  activeSlide: {
    opacity: '1',
    transform: 'translateX(0)',
  },
  lastSlide: {
    transform: 'translateX(-100%)',
  },
  nextSlide: {
    transform: 'translateX(100%)',
  },
};

interface AutoSliderProps {
  data: {
    image: string;
    title: string;
  }[];
}

const AutoSlider: React.FC<AutoSliderProps> = ({ data }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < 0) {
      setIndex(data.length - 1);
    }
    if (index > data.length - 1) {
      setIndex(0);
    }
  }, [index, data]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);
  return (
    <div className={styles.section}>
      <div className={styles.menu}>
        {data.map((item, itemIndex) => {
          const { image, title } = item;
          let position = sliderStyles.nextSlide;
          if (itemIndex === index) {
            position = sliderStyles.activeSlide;
          }
          if (
            itemIndex === index - 1 ||
            (index === 0 && itemIndex === data.length - 1)
          ) {
            position = sliderStyles.lastSlide;
          }
          return (
            <div className={styles.item} style={position} key={itemIndex}>
              <div className={styles.title}>
                <h6>{title}</h6>
              </div>
              <div className={styles.image}>
                <img src={image} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(AutoSlider);
