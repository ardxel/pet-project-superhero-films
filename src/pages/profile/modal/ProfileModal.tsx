import React from 'react';
import styles from './profileModal.module.scss';
import {
  ProfileAction,
  ProfileActionKind,
  ProfileState,
} from '@pages/profile/profileReducer';
import { Box, Modal } from '@mui/material';
import { profileFormList } from '@pages/profile/profileListItems';

interface ProfileModalProps {
  profileState: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ ...props }) => {
  const { profileState, dispatch } = props;
  return (
    <Modal
      open={profileState.isModalOpen as boolean}
      onClose={() => dispatch({ type: ProfileActionKind.CLOSE_MODAL })}
      disableScrollLock={true}
      data-testid="edit-profile-modal"
    >
      <Box className={styles.box}>
        {profileFormList.map(({ Form, conditionStateKey }) => {
          if (profileState[conditionStateKey]) {
            return (
              <Form
                key={conditionStateKey}
                setIsChanged={() =>
                  dispatch({ type: ProfileActionKind.IS_CHANGED_PROFILE })
                }
              />
            );
          } else return null;
        })}
      </Box>
    </Modal>
  );
};

export default ProfileModal;
