import React, { useEffect, useState } from 'react';
import styles from './autoslider.module.scss';

interface AutoSliderProps {}
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
const sliderItems = [
  {
    image:
      'https://sportshub.cbsistatic.com/i/2021/11/09/0e64101b-a849-45dd-b7cd-076693cc7b51/spider-man-no-way-home-fan-poster.jpg',
    title: 'Watch various selections of movies online!',
  },
  {
    image: 'https://i.ytimg.com/vi/cQ5Cp_kdQDU/maxresdefault.jpg',
    title: 'Check out the latest news section!',
  },
];

const AutoSlider: React.FC<AutoSliderProps> = () => {
  const [images, setImages] = useState(sliderItems);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < 0) {
      setIndex(images.length - 1);
    }
    if (index > images.length - 1) {
      setIndex(0);
    }
  }, [index, images]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);
  return (
    <article className={styles.article}>
      <div className={styles.menu}>
        {sliderItems.map((item, itemIndex) => {
          const { image, title } = item;
          let position = sliderStyles.nextSlide;
          if (itemIndex === index) {
            position = sliderStyles.activeSlide;
          }
          if (
            itemIndex === index - 1 ||
            (index === 0 && itemIndex === images.length - 1)
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
    </article>
  );
};

export default AutoSlider;
