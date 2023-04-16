import React, { useEffect, useState } from 'react';
import superstyles from '@styles/superstyles.module.scss';
import { Form, Formik, FormikProps } from 'formik';
import { LoginRequest } from '@models/apiModels/LoginModel';
import { loginValidation } from '@components/forms/validationSchemas';
import FormTitle from '@components/forms/form-title/FormTitle';
import InputField from '@common/formFields/InputField';
import { useLoginUserMutation } from '@reduxproj//api/userApi';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { login } from '@reduxproj/reducers/userReducer';
import { useNavigate } from 'react-router';
import { sleep } from '@tools/sleep';
import fieldKit from '@components/forms/fieldKit';
import { SubmitButton } from '@common/formFields';

const initialValues: LoginRequest = {
  login: '',
  password: '',
};

const templateValues: LoginRequest = {
  login: 'john123',
  password: 'Qwerty12345'
}

const LoginForm: React.FC<{testTemplate: boolean}> = ({testTemplate = false}) => {
  const [loginUser, result] = useLoginUserMutation();
  const [passwordShown, setPasswordShown] = useState(false);
  const { login: inputLogin, password: inputPassword } = fieldKit;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const togglePassword = () => setPasswordShown(!passwordShown);

  useEffect(() => {
    if (result.data && result.data.user && result.isSuccess) {
      dispatch(login(result.data.user));
      sleep(1500).then(() => navigate('/'));
    }
  }, [result.data]);

  return (
    <div>
      <FormTitle
        title={'Login'}
        showAlert={result.isSuccess || false}
        severity={result.data ? result.data.severity : undefined}
        message={result.data ? result.data.message : undefined}
      />
      <Formik
        enableReinitialize={true}
        initialValues={testTemplate ? templateValues : initialValues}
        onSubmit={loginUser}
        validate={(values) => loginValidation(values)}

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
            <SubmitButton disabled={testTemplate ? !testTemplate : !(props.isValid && props.dirty)} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
