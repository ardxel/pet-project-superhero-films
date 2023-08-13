import React, { useEffect, useState } from 'react';
import superstyles from '@styles/superstyles.module.scss';
import { Form, Formik, FormikProps } from 'formik';
import { RegistrationRequest } from '@models/apiModels/RegistrationModel';
import { signUpValidation } from '@components/forms/validationSchemas';
import { useRegisterUserMutation } from '@reduxproj//api/userApi';
import { registration } from '@reduxproj//reducers/userReducer';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import FormTitle from '@components/forms/form-title/FormTitle';
import { sleep } from '@common/tools';
import { useNavigate } from 'react-router';
import fieldKit from '@components/forms/fieldKit';
import { SubmitButton, InputField } from '@common/formFields';

const initialValues: RegistrationRequest = {
  email: '',
  username: '',
  password: '',
  confirm_password: '',
};

const RegistrationForm = () => {
  const [registerUser, result] = useRegisterUserMutation();
  const [passwordShown, setPasswordShown] = useState(false);
  const { email, username, password, confirm_password } = fieldKit;
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (result.data && result.data.user && result.isSuccess) {
      console.log(result.data);
      dispatch(registration(result.data.user));
    }
  }, [result.data]);
  useEffect(() => {
    if (token && result.isSuccess) {
      sleep(1500).then(() => navigate('/'));
    }
  }, [token, result.isSuccess]);

  const togglePassword = () => setPasswordShown(!passwordShown);
  const adornmentProps = {
    style: {
      cursor: 'pointer',
    },
    onClick: togglePassword,
  };
  return (
    <div>
      <FormTitle
        title={'Registration'}
        showAlert={result.isSuccess || false}
        severity={result.data ? result.data.severity : undefined}
        message={result.data ? result.data.message : undefined}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={registerUser}
        validate={signUpValidation}
      >
        {(props: FormikProps<RegistrationRequest>) => (
          <Form className={superstyles.form} onSubmit={props.handleSubmit}>
            <InputField
              name={email.name}
              label={email.label}
              type={email.type}
              inputProps={{ tabIndex: -1 }}
              adornment={<email.Adornment />}
            />

            <InputField
              name={username.name}
              label={username.label}
              type={username.type}
              inputProps={{ tabIndex: 2 }}
              adornment={<username.Adornment />}
            />

            <InputField
              name={password.name}
              label={password.label}
              type={passwordShown ? 'text' : 'password'}
              inputProps={{ tabIndex: 3 }}
              adornment={
                passwordShown ? (
                  <confirm_password.AddAdornment {...adornmentProps} />
                ) : (
                  <confirm_password.Adornment {...adornmentProps} />
                )
              }
            />
            <InputField
              name={confirm_password.name}
              label={confirm_password.label}
              type={passwordShown ? 'text' : 'password'}
              inputProps={{ tabIndex: 4 }}
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

export default RegistrationForm;
