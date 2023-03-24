import React, { useEffect } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import superstyles from '@styles/superstyles.module.scss';
import { useEditProfileMutation } from 'redux/api/userApi';
import FormTitle from '@components/forms/form-title/FormTitle';
import { Form, Formik, FormikProps } from 'formik';
import InputField from 'common/formFields/InputField';
import fieldKit from '@components/forms/fieldKit';
import usePassword from '@hooks/usePassword';
import { SubmitButton } from 'common/formFields';
import { changePasswordValidation } from '@components/forms/validationSchemas';
import { EditProfileRequest } from 'models/apiModels';
import { ProfileFormType } from '@pages/profile/Profile';

const EditPrivateForm: React.FC<ProfileFormType> = ({ setIsChanged }) => {
  const { passwordShown, adornmentProps } = usePassword();
  const token = useAppSelector((state) => state.user.token);
  const [changePassword, result] = useEditProfileMutation();
  const { password, confirm_password } = fieldKit;

  const handleSubmit = (values: {
    password: string;
    confirm_password: string;
  }): void => {
    const request: EditProfileRequest = {
      password: values.password,
      token: token,
    };
    changePassword(request);
  };

  useEffect(() => {
    if (result.data && result.isSuccess) {
      setIsChanged(true);
    }
  }, [result]);

  return (
    <div style={{ width: '90%' }}>
      <FormTitle title={'Change password'} />
      <Formik
        initialValues={{ password: '', confirm_password: '' }}
        validate={changePasswordValidation}
        onSubmit={handleSubmit}
      >
        {(
          props: FormikProps<{ password: string; confirm_password: string }>
        ) => (
          <Form className={superstyles.form} onSubmit={props.handleSubmit}>
            <InputField
              name={password.name}
              label="New password"
              type={passwordShown ? 'text' : 'password'}
              adornment={
                passwordShown ? (
                  <password.AddAdornment {...adornmentProps} />
                ) : (
                  <password.Adornment {...adornmentProps} />
                )
              }
            />
            <InputField
              name={confirm_password.name}
              type={passwordShown ? 'text' : 'password'}
              label="confirm new password"
              adornment={
                passwordShown ? (
                  <confirm_password.AddAdornment {...adornmentProps} />
                ) : (
                  <confirm_password.Adornment {...adornmentProps} />
                )
              }
            />
            <SubmitButton />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPrivateForm;
