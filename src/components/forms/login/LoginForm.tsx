import React, { useEffect, useState } from 'react';
import superstyles from '@styles/superstyles.module.scss';
import { Form, Formik, FormikProps } from 'formik';
import { LoginRequest } from 'models/formModels';
import { loginValidation } from '@components/forms/validationSchemas';
import FormTitle from '@components/forms/form-title/FormTitle';
import loginFields from '@components/forms/login/loginFieldsList';
import InputField from 'common/formFields/InputField';
import { Button } from '@mui/material';
import { useLoginUserMutation } from 'redux/api/userApi';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { login } from 'redux/reducers/userReducer';
import { useAppSelector } from '@hooks/useAppSelector';
import { useNavigate } from 'react-router';
import { sleep } from 'common/tools';

const initialValues: LoginRequest = {
  login: '',
  password: '',
};

const LoginForm: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [loginUser, result] = useLoginUserMutation();
  const [passwordShown, setPasswordShown] = useState(false);
  const { inputLogin, inputPassword } = loginFields;
  const dispatch = useAppDispatch();
  const togglePassword = () => setPasswordShown(!passwordShown);
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (result.data && result.data.user && result.isSuccess) {
      console.log(result.data.user);
      dispatch(login(result.data.user));
      sleep(1500).then(() => navigate('/'));
    }
  }, [result.data]);

  return (
    <div>
      <FormTitle
        title={'Login'}
        showAlert={result.isSuccess}
        severity={result.data ? result.data.severity : undefined}
        message={result.data ? result.data.message : undefined}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={loginUser}
        validate={loginValidation}
      >
        {(props: FormikProps<LoginRequest>) => (
          <Form className={superstyles.form} onSubmit={props.handleSubmit}>
            <InputField
              name={inputLogin.name}
              label={inputLogin.label}
              type={inputLogin.type}
              adornment={<inputLogin.Adornment />}
            />

            <InputField
              name={inputPassword.name}
              label={inputPassword.label}
              type={passwordShown ? 'text' : 'password'}
              adornment={
                passwordShown ? (
                  <inputPassword.AddAdornment onClick={togglePassword} />
                ) : (
                  <inputPassword.Adornment onClick={togglePassword} />
                )
              }
            />
            <Button
              disabled={!(props.isValid && props.dirty)}
              variant="contained"
              type="submit"
              className={superstyles.submit}
            >
              submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
