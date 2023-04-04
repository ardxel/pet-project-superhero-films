import React from 'react';
import styles from './cardActor.module.scss';
import { IActor } from '@models/Movie';

interface CardActorProps extends IActor {}

const CardActor: React.FC<CardActorProps> = ({ name, image, asCharacter }) => {
  return (
    <li className={styles.actor}>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src={image} alt={name} />
        </div>
        <div className={styles.info}>
          <h5 className={styles.name}>{name}</h5>
          <h6 className={styles.asCharacter}>{asCharacter}</h6>
        </div>
      </div>
    </li>
  );
};

export default CardActor;
