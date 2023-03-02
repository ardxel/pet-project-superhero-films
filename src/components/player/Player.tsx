import React, { useEffect, useState } from 'react';
import styles from './player.module.scss';

interface PlayerProps {
  urls: string[] | null;
}

// tool for(let film of document.querySelectorAll('iframe')) {console.log(film.src)}

const Player: React.FC<PlayerProps> = ({ urls }) => {
  const [videos, setVideos] = useState<string[]>([]);
  useEffect(() => {
    setVideos(urls as string[]);
  }, [urls]);
  if (!videos) {
    return <h1>Video not found...</h1>;
  }
  return (
    <div className={styles.player}>
      <div className={styles.video}>
        <iframe
          src={videos[0]}
          className={styles.iframe}
          // width="640" height="480"
        ></iframe>
      </div>
    </div>
  );
};

export default Player;
