import { InputField, SubmitButton } from '@common/formFields/';
import fieldKit from '@components/forms/fieldKit';
import { changePasswordValidation } from '@components/forms/validationSchemas';
import { useAppDispatch } from '@hooks/useAppDispatch';
import usePassword from '@hooks/usePassword';
import { EditProfileRequest } from '@models/apiModels/EditProfileModel';
import { ProfileFormType } from '@pages/profile/Profile';
import { changeUser } from '@reduxproj/api/user.api';
import superstyles from '@styles/superstyles.module.scss';
import { Form, Formik, FormikProps } from 'formik';

type PrivateFormFieldsType = {
  password: string;
  confirm_password: string;
};

const EditPrivateForm: React.FC<ProfileFormType> = ({ setIsChanged }) => {
  const { passwordShown, adornmentProps } = usePassword();
  // const [changePassword, result] = useEditProfileMutation();
  const { password, confirm_password } = fieldKit;
  const dispatch = useAppDispatch();

  const _handleSubmit = (values: PrivateFormFieldsType): void => {
    const body: EditProfileRequest = {
      password: values.password,
    };
    // changePassword(request);
    dispatch(changeUser(body));
  };

  // useEffect(() => {
  //   if (result.data && result.isSuccess) {
  //     setIsChanged();
  //   }
  // }, [result]);

  return (
    <div style={{ width: '90%' }}>
      {/* <FormTitle
        title={'Change password'}
        showAlert={!!result.data}
        {...result.data}
      /> */}
      <Formik
        initialValues={{ password: '', confirm_password: '' }}
        validate={changePasswordValidation}
        onSubmit={_handleSubmit}>
        {(props: FormikProps<PrivateFormFieldsType>) => (
          <Form
            className={superstyles.form}
            onSubmit={props.handleSubmit}>
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
