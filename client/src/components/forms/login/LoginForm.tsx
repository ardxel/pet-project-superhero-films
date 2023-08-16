import { SubmitButton } from '@common/formFields';
import InputField from '@common/formFields/InputField';
import fieldKit from '@components/forms/fieldKit';
import { loginValidation } from '@components/forms/validationSchemas';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { LoginRequest } from '@models/apiModels/LoginModel';
import { login } from '@reduxproj/api/user.api';
import superstyles from '@styles/superstyles.module.scss';
import { Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialValues: LoginRequest = {
  emailOrUsername: '',
  password: '',
};

const templateValues: LoginRequest = {
  emailOrUsername: 'john123',
  password: 'Qwerty12345',
};

const LoginForm: React.FC<{ testTemplate: boolean }> = ({ testTemplate = false }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { emailOrUsername: inputLogin, password: inputPassword } = fieldKit;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginUser = (body: LoginRequest) => {
    dispatch(login(body));
  };

  const togglePassword = () => setPasswordShown(!passwordShown);

  return (
    <div>
      {/* <FormTitle
        title={'Login'}
        showAlert={result.isSuccess || false}
        severity={result.data ? result.data.severity : undefined}
        message={result.data ? result.data.message : undefined}
      /> */}
      <Formik
        enableReinitialize={true}
        initialValues={testTemplate ? templateValues : initialValues}
        onSubmit={loginUser}
        validate={(values) => loginValidation(values)}>
        {(props: FormikProps<LoginRequest>) => (
          <Form
            className={superstyles.form}
            onSubmit={props.handleSubmit}>
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
