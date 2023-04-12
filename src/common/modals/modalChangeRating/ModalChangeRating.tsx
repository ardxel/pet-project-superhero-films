import React, { useCallback, useEffect, useState } from 'react';
import styles from './modalChangeRating.module.scss';
import { Box, Button, Modal, Rating, Typography } from '@mui/material';
import { getColor, getRating } from '@tools/upgradeRating';
import superstyles from '@styles/superstyles.module.scss';
import useUserProfile from '@hooks/useUserProfile';

interface ModalChangeRatingProps {
  open: boolean
  close: () => void
  id: number
}

const ModalChangeRating: React.FC<ModalChangeRatingProps> = ({id, open, close}) => {
  const [displayModalActiveChangeRating, setDisplayModalActiveChangeRating] =
    useState<number | null>(null);
  const [myRating, setMyRating] = useState<number>(0);
  const { handleChangeUserCollection, userState } = useUserProfile();

  useEffect(() => {

    const ratingItem = userState.ratings.find((item) => item.id === id)

    if (ratingItem) {
      setMyRating(ratingItem.value);
    }

  }, [userState.ratings, id])


  const handleChangeMyRating = useCallback((
    e: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value) {
      const item = { id: id, value: value };
      handleChangeUserCollection(item, 'ratings');
      close();
      setMyRating(value);
    }
  }, [userState.ratings]);

  const handleDisplayActiveRating = (
    e: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
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
    handleChangeUserCollection({ id: id, value: -1 }, 'ratings');
    close();
    setMyRating(0);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      disableScrollLock={true}
    >
      <Box className={styles.box}>
        <Typography component='h1'>Choose your rating</Typography>
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
              : getColor(displayModalActiveChangeRating)
          }}
        >
              {!displayModalActiveChangeRating
                ? getRating(myRating)
                : getRating(displayModalActiveChangeRating)}
            </span>
        {myRating &&
          <Button
            className={[superstyles.editButton, styles.removeRating].join(' ')}
            onClick={handleDeleteMyRating}>
            Remove rating
          </Button>}
      </Box>
    </Modal>
  );
};

export default ModalChangeRating;