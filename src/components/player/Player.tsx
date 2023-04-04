import React, { useEffect, useRef, useState } from 'react';
import styles from './player.module.scss';
import superstyles from '@styles/superstyles.module.scss';
import Loading from '@common/loading/Loading';

interface PlayerProps {
  sources: string[] | null;
}

const Player: React.FC<PlayerProps> = ({ sources }) => {
  const [srcIndex, setSrcIndex] = useState<number>(0);
  const [showedVideo, setShowedVideo] = useState<string>('');
  const [isIFrameLoaded, setIsIFrameLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (sources) {
      setShowedVideo(sources[0]);
    }
    const iframeCurrent = iframeRef.current;
    iframeCurrent?.addEventListener('load', () => setIsIFrameLoaded(true));
    return () => {
      iframeCurrent?.removeEventListener('load', () => setIsIFrameLoaded(true));
    };
  }, []);

  useEffect(() => {
    if (sources) {
      setShowedVideo(sources[srcIndex]);
    }
  }, [srcIndex]);

  if (!sources) {
    return <h1>Video not found...</h1>;
  }
  return (
    <div className={styles.player}>
      <div className={styles.video}>
        {!isIFrameLoaded && (
          <Loading
            className={superstyles.absoluteCenter}
            style={{ width: '25%' }}
          />
        )}
        <iframe
          ref={iframeRef}
          allowFullScreen={true}
          src={showedVideo}
          className={styles.iframe}
          // width="640" height="480"
        ></iframe>
      </div>
    </div>
  );
};

export default Player;
