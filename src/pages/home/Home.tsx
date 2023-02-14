import React, { useEffect } from 'react';
import styles from './home.module.scss';
import Slider from '../../components/slider/Slider';
import franchisesList from '@constants/franchisesList';

export default function Home() {

  return (
    <main className={styles.home}>
      <div className={styles.container}>
        {franchisesList.map(franchise => {
          const {id, name} = franchise;
          return (
            <Slider key={id} title={name}/>
          )
        })}
      </div>
    </main>
  );
}
