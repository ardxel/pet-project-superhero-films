import {
  EditPersonalForm,
  EditPrivateForm,
  EditProfileForm,
} from '@components/forms/profile';

export const profileButtonGroup = [
  { id: 0, title: 'Edit profile', dispatchType: 'TOGGLE_PROFILE' },
  { id: 1, title: 'Change Password', dispatchType: 'TOGGLE_PRIVATE' },
  { id: 2, title: 'Personal Details', dispatchType: 'TOGGLE_PERSONAL' },
];

export const profileFormList = [
  { id: 0, Form: EditProfileForm, conditionStateKey: 'isEditProfile' },
  { id: 1, Form: EditPrivateForm, conditionStateKey: 'isEditPrivate' },
  { id: 2, Form: EditPersonalForm, conditionStateKey: 'isEditPersonal' },
];
