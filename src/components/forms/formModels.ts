import React from 'react';

export interface IFormValues {
  email?: string;
  username?: string;
  password?: string;
  confirm_password?: string;
  login?: string;
}

export interface RegistrationFormValues extends IFormValues {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export interface ILoginFormValues extends IFormValues {
  login: string;
  password: string;
}

export interface InputType {
  label: string,
  name: string,
  type: string,
  adornment?: React.ReactElement
}
