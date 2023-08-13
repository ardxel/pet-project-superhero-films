import React, { useEffect } from 'react';
import FormTitle from '@components/forms/form-title/FormTitle';
import { Form, Formik, FormikProps } from 'formik';
import superstyles from '@styles/superstyles.module.scss';
import { TextAreaField, InputField, SubmitButton } from '@common/formFields';
import { useEditProfileMutation } from '@reduxproj/api/userApi';
import { useAppSelector } from '@hooks/useAppSelector';
import { editProfileValidation } from '@components/forms/validationSchemas';
import fieldKit from '@components/forms/fieldKit';
import { ProfileFormType } from '@pages/profile/Profile';

type ProfileFormFieldsType = {
  name: string;
  avatar: string;
  biography: string;
};

const EditProfileForm: React.FC<ProfileFormType> = ({ setIsChanged }) => {
  const token = useAppSelector((state) => state.user.token);
  const [editProfile, result] = useEditProfileMutation();
  const { name, avatar, biography } = fieldKit;

  const _handleSubmit = (values: ProfileFormFieldsType) => {
    const request = { ...values, token };
    editProfile(request);
  };

  useEffect(() => {
    if (result.data && result.isSuccess) {
      setIsChanged();
    }
  }, [result]);

  return (
    <div style={{ width: '90%' }}>
      <FormTitle
        title={'Change Username and Biography'}
        showAlert={result.isSuccess || false}
        severity={result.data ? result.data.severity : undefined}
        message={result.data ? result.data.message : undefined}
      />
      <Formik
        initialValues={{ name: '', avatar: '', biography: '' }}
        validate={editProfileValidation}
        onSubmit={_handleSubmit}
      >
        {(props: FormikProps<ProfileFormFieldsType>) => (
          <Form className={superstyles.form} onSubmit={props.handleSubmit}>
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
            <TextAreaField label={biography.label} name={biography.name} />
            <SubmitButton />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfileForm;
