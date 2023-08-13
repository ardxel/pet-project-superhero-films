import React from 'react';
import styles from './profileHeader.module.scss';
import { Button, ButtonGroup } from '@mui/material';
import { profileButtonGroup } from '@pages/profile/profileListItems';
import superstyles from '@styles/superstyles.module.scss';
import {
  ProfileActionKind,
  ProfileState,
  ProfileAction,
} from '@pages/profile/profileReducer';
import { UserReduxState } from '@models/User';

interface ProfileHeaderProps {
  profileState: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ ...props }) => {
  const { profileState, dispatch } = props;
  const { avatar, username, name, biography } =
    profileState.currentUser as UserReduxState;
  return (
    <>
      <div className={styles.head}>
        <div className={styles.info}>
          <div className={styles.img}>
            {avatar ? <img src={avatar} /> : <span>no image</span>}
          </div>
          <div className={styles.name}>
            <h3>{username}</h3>
            <h6>{name || 'no name'}</h6>
          </div>
        </div>

        {profileState.showButtonGroup && (
          <div className={styles.edit}>
            <ButtonGroup orientation='vertical' className={styles.buttons}>
              {profileButtonGroup.map((item) => (
                <Button
                  key={item.dispatchType}
                  className={superstyles.editButton}
                  onClick={() =>
                    dispatch({ type: ProfileActionKind[item.dispatchType] })
                  }
                >
                  {item.title}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        )}
      </div>
      {biography && (
        <div className={styles.bio}>
          <h3>Bio:</h3>
          <p>{biography}</p>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
