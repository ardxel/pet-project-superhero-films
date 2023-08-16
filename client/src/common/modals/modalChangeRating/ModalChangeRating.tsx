import useMovieReview from '@hooks/useMovieReview';
import useUserProfile from '@hooks/useUserProfile';
import { Box, Button, Modal, Rating, Typography } from '@mui/material';
import superstyles from '@styles/superstyles.module.scss';
import { getColor, getRating } from '@tools/upgradeRating';
import { useCallback, useEffect, useState } from 'react';
import styles from './modalChangeRating.module.scss';

interface ModalChangeRatingProps {
  _movieId: number;
  open: boolean;
  closeModal: () => void;
}

const ModalChangeRating: React.FC<ModalChangeRatingProps> = ({ open, closeModal, _movieId }) => {
  const [displayModalActiveChangeRating, setDisplayModalActiveChangeRating] = useState<number | null>(null);
  const [myRating, setMyRating] = useState<number>(0);
  const { user, handleChangeUser } = useUserProfile();
  const { inRatings } = useMovieReview(_movieId);

  useEffect(() => {
    if (inRatings) {
      setMyRating(user.ratings.find((r) => r.id === _movieId)?.value as number);
    }
  }, [user.ratings, _movieId]);

  const handleChangeMyRating = useCallback(
    (e: React.SyntheticEvent<Element, Event>, value: number | null) => {
      if (value) {
        const item = { id: _movieId, value: value };
        const ratings = [...user.ratings];
        if (inRatings) {
          const currentIndex = ratings.findIndex((v) => v.id === _movieId);
          ratings[currentIndex].value = value;
        } else {
          ratings.push(item);
        }

        handleChangeUser('ratings', ratings);
        closeModal();
        setMyRating(value);
      }
    },
    [user.ratings],
  );

  const handleDisplayActiveRating = (e: React.SyntheticEvent<Element, Event>, value: number | null) => {
    if (value) {
      if (value > 0) {
        setDisplayModalActiveChangeRating(value);
      }
      if (value <= 0) {
        setDisplayModalActiveChangeRating(myRating);
      }
    }
  };
  const handleDeleteMyRating = () => {
    // handleChangeUserCollection({ id: id, value: -1 }, 'ratings');
    closeModal();
    setMyRating(0);
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      disableScrollLock={true}>
      <Box className={styles.box}>
        <Typography component="h1">Choose your rating</Typography>
        <Rating
          defaultValue={myRating}
          className={styles.changeRating}
          max={10.0}
          precision={0.1}
          onChange={handleChangeMyRating}
          onChangeActive={handleDisplayActiveRating}
        />
        <span
          className={styles.activeRating}
          style={{
            backgroundColor: !displayModalActiveChangeRating
              ? getColor(myRating)
              : getColor(displayModalActiveChangeRating),
          }}>
          {!displayModalActiveChangeRating ? getRating(myRating) : getRating(displayModalActiveChangeRating)}
        </span>
        {myRating && (
          <Button
            className={[superstyles.editButton, styles.removeRating].join(' ')}
            onClick={handleDeleteMyRating}>
            Remove rating
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default ModalChangeRating;
