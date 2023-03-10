import React from 'react';
import styles from './base.module.scss';
import toHoursAndMinutes from 'common/tools/toHoursAndMinutes';
import formatAgeLimits from 'common/tools/formatAgeLimits';

interface BaseProps {
  nameOriginal: string;
  nameRu: string;
  year: number;
  filmLength: number;
  ratingAgeLimits: string;
}

const Base: React.FC<BaseProps> = ({
  nameOriginal,
  nameRu,
  year,
  filmLength,
  ratingAgeLimits,
}) => {
  return (
    <div className={styles.base}>
      <div className={styles.title}>
        <h3>{`${nameOriginal} / ${nameRu}`}</h3>
      </div>
      <div className={styles.params}>
        <span className={styles.year}>{year}</span>
        <span className={styles.length}>{toHoursAndMinutes(filmLength)}</span>
        <span className={styles.age}>{formatAgeLimits(ratingAgeLimits)}</span>
      </div>
    </div>
  );
};

export default Base;
