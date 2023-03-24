import React, { useCallback, useEffect, useState } from 'react';
import FormTitle from '@components/forms/form-title/FormTitle';
import styles from 'common/formFields/styles';
import superstyles from '@styles/superstyles.module.scss';
import { Form, Formik, FormikProps } from 'formik';
import { useAppSelector } from '@hooks/useAppSelector';
import { FormControlLabel, MenuItem, Radio } from '@mui/material';
import {
  RadioGroupField,
  DatePickerField,
  SubmitButton,
} from 'common/formFields';
import axios from 'axios';
import BASE_URL from '@constants/baseUrl';
import SelectField from 'common/formFields/SelectField';
import { capitalizeFirstLetter } from 'common/tools';
import { useEditProfileMutation } from 'redux/api/userApi';
import { DefaultUserResponse } from 'models/apiModels';
import { ProfileFormType } from '@pages/profile/Profile';

const radioButtonList = [
  { id: 0, value: 'female', label: 'Female' },
  { id: 1, value: 'male', label: 'Male' },
  { id: 2, value: 'other', label: 'Other' },
];

const EditPersonalForm: React.FC<ProfileFormType> = ({ setIsChanged }) => {
  const token = useAppSelector((state) => state.user.token);
  const [countries, setCountries] = useState<{ name: string }[]>(null!);
  const [editProfile, result] = useEditProfileMutation();

  const _handleSubmit = (values: {
    gender: string;
    birthday: string;
    country: string;
  }): void => {
    const request = {
      ...values,
      birthday: new Date(values.birthday).toLocaleDateString(),
      token: token,
    };
    editProfile(request);
  };

  const fetchCountries = useCallback(async () => {
    const response = await axios.get(`${BASE_URL}/countries`);
    const data = await response.data;
    setCountries(data);
  }, []);

  useEffect(() => {
    if (result.data && result.isSuccess) {
      setIsChanged(true);
    }
  }, [result]);

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div style={{ width: '90%' }}>
      <FormTitle
        title="Change Personal Info"
        showAlert={!!result.data}
        {...(result.data as DefaultUserResponse)}
      />
      <Formik
        initialValues={{ gender: '', birthday: '', country: '' }}
        onSubmit={_handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form className={superstyles.form} onSubmit={props.handleSubmit}>
            <RadioGroupField name="gender" style={{ margin: '0 auto' }}>
              {radioButtonList.map(({ id, value, label }) => (
                <FormControlLabel
                  key={id}
                  value={value}
                  label={label}
                  sx={{ color: 'var(--color13)' }}
                  control={<Radio sx={styles.radioButton} />}
                />
              ))}
            </RadioGroupField>

            <DatePickerField name="birthday" label="Your Birthday" />

            <SelectField name="country" label="Country">
              {countries &&
                countries.map((country) => {
                  const name = capitalizeFirstLetter(country.name);
                  return (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  );
                })}
            </SelectField>
            <SubmitButton />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPersonalForm;