import { ReactElement } from 'react';

export interface FormikValues {
  email?: string;
  username?: string;
  password?: string;
  confirm_password?: string;
  login?: string;
}

export interface InputType {
  label?: string;
  name: string;
  type?: string;
  adornment?: ReactElement;
}
