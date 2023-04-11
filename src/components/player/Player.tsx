import React, { useEffect, useRef, useState } from 'react';
import styles from './player.module.scss';
import superstyles from '@styles/superstyles.module.scss';
import Loading from '@common/loading/Loading';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface PlayerProps {
  sources: string[] | null;
}

const Player: React.FC<PlayerProps> = ({ sources }) => {
  const [srcIndex, setSrcIndex] = useState<number>(0);
  const [showedVideo, setShowedVideo] = useState<string | undefined>(undefined);
  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (sources) {
      setShowedVideo(sources[0]);
    }
  }, [sources]);

  useEffect(() => {
    const iframeCurrent = iframeRef.current;
    iframeCurrent?.addEventListener('load', () => setIsIFrameLoaded(true));
    iframeCurrent?.contentWindow?.document.addEventListener(
      'DOMContentLoaded',
      () => {
        setIsIFrameLoaded(false);
      }
    );
    return () => {
      iframeCurrent?.removeEventListener('load', () => setIsIFrameLoaded(true));
      iframeCurrent?.contentWindow?.document.removeEventListener(
        'DOMContentLoaded',
        () => {
          setIsIFrameLoaded(false);
        }
      );
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
      <div className={styles.buttons}>
        {sources.map((item, index) => {
          return (
            <Button
              className={superstyles.button}
              key={index}
              onClick={setSrcIndex.bind(null, index)}
              startIcon={srcIndex === index && <CheckIcon />}
            >
              player {index + 1}
            </Button>
          );
        })}
      </div>

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
