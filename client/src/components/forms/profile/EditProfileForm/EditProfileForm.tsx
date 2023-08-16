import { InputField, SubmitButton, TextAreaField } from '@common/formFields';
import fieldKit from '@components/forms/fieldKit';
import { editProfileValidation } from '@components/forms/validationSchemas';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { ProfileFormType } from '@pages/profile/Profile';
import { changeUser } from '@reduxproj/api/user.api';
import superstyles from '@styles/superstyles.module.scss';
import { Form, Formik, FormikProps } from 'formik';

type ProfileFormFieldsType = {
  name: string;
  avatar: string;
  biography: string;
};

const EditProfileForm: React.FC<ProfileFormType> = ({ setIsChanged }) => {
  const dispatch = useAppDispatch();
  const { name, avatar, biography } = fieldKit;

  const _handleSubmit = (values: ProfileFormFieldsType) => {
    const request = { ...values };
    dispatch(changeUser(request));
  };

  // useEffect(() => {
  //   if (result.data && result.isSuccess) {
  //     setIsChanged();
  //   }
  // }, [result]);

  return (
    <div style={{ width: '90%' }}>
      {/* <FormTitle
        title={'Change Username and Biography'}
        showAlert={result.isSuccess || false}
        severity={result.data ? result.data.severity : undefined}
        message={result.data ? result.data.message : undefined}
      /> */}
      <Formik
        initialValues={{ name: '', avatar: '', biography: '' }}
        validate={editProfileValidation}
        onSubmit={_handleSubmit}>
        {(props: FormikProps<ProfileFormFieldsType>) => (
          <Form
            className={superstyles.form}
            onSubmit={props.handleSubmit}>
            <InputField
              label={avatar.label}
              type="text"
              name={avatar.name}
              adornment={<avatar.Adornment />}
            />
            <InputField
              label={name.label}
              type="text"
              name={name.name}
              adornment={<name.Adornment />}
            />
            <TextAreaField
              label={biography.label}
              name={biography.name}
            />
            <SubmitButton />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfileForm;
