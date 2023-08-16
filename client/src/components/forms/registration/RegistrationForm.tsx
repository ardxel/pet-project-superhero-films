import { InputField, SubmitButton } from '@common/formFields';
import fieldKit from '@components/forms/fieldKit';
import { signUpValidation } from '@components/forms/validationSchemas';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { RegistrationRequest } from '@models/apiModels/RegistrationModel';
import { registration } from '@reduxproj/api/user.api';
import superstyles from '@styles/superstyles.module.scss';
import { Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialValues: RegistrationRequest = {
  email: '',
  username: '',
  password: '',
  confirm_password: '',
};

const RegistrationForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { email, username, password, confirm_password } = fieldKit;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const registerUser = (body: RegistrationRequest) => {
    dispatch(registration(body));
  };

  const togglePassword = () => setPasswordShown(!passwordShown);
  const adornmentProps = {
    style: {
      cursor: 'pointer',
    },
    onClick: togglePassword,
  };
  return (
    <div>
      {/* <FormTitle
        title={'Registration'}
        showAlert={result.isSuccess || false}
        severity={result.data ? result.data.severity : undefined}
        message={result.data ? result.data.message : undefined}
      /> */}
      <Formik
        initialValues={initialValues}
        onSubmit={registerUser}
        validate={signUpValidation}>
        {(props: FormikProps<RegistrationRequest>) => (
          <Form
            className={superstyles.form}
            onSubmit={props.handleSubmit}>
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
