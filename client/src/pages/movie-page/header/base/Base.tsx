import React, { memo } from 'react';
import styles from './base.module.scss';
import { toHoursAndMinutes, formatAgeLimits } from '@common/tools/';

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

export default memo(Base);
