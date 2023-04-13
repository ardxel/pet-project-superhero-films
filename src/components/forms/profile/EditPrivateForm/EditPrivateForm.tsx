import React, { useEffect } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import superstyles from '@styles/superstyles.module.scss';
import { useEditProfileMutation } from '@reduxproj//api/userApi';
import FormTitle from '@components/forms/form-title/FormTitle';
import { Form, Formik, FormikProps } from 'formik';
import { InputField, SubmitButton } from '@common/formFields/';
import fieldKit from '@components/forms/fieldKit';
import usePassword from '@hooks/usePassword';
import { changePasswordValidation } from '@components/forms/validationSchemas';
import { EditProfileRequest } from '@models/apiModels/EditProfileModel';
import { ProfileFormType } from '@pages/profile/Profile';

type PrivateFormFieldsType = {
  password: string;
  confirm_password: string;
};

const EditPrivateForm: React.FC<ProfileFormType> = ({ setIsChanged }) => {
  const { passwordShown, adornmentProps } = usePassword();
  const token = useAppSelector((state) => state.user.token);
  const [changePassword, result] = useEditProfileMutation();
  const { password, confirm_password } = fieldKit;

  const _handleSubmit = (values: PrivateFormFieldsType): void => {
    const request: EditProfileRequest = {
      password: values.password,
      token: token,
    };
    changePassword(request);
  };

  useEffect(() => {
    if (result.data && result.isSuccess) {
      setIsChanged();
    }
  }, [result]);

  return (
    <div style={{ width: '90%' }}>
      <FormTitle
        title={'Change password'}
        showAlert={!!result.data}
        {...result.data}
      />
      <Formik
        initialValues={{ password: '', confirm_password: '' }}
        validate={changePasswordValidation}
        onSubmit={_handleSubmit}
      >
        {(props: FormikProps<PrivateFormFieldsType>) => (
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
            <SubmitButton disabled={!(props.isValid && props.dirty)} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPrivateForm;
