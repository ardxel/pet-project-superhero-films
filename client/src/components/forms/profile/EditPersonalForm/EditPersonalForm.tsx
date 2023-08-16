import { DatePickerField, RadioGroupField, SelectField, SubmitButton } from '@common/formFields';
import styles from '@common/formFields/styles';
import BASE_URL from '@constants/baseUrl';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { FormControlLabel, MenuItem, Radio } from '@mui/material';
import { ProfileFormType } from '@pages/profile/Profile';
import { changeUser } from '@reduxproj/api/user.api';
import superstyles from '@styles/superstyles.module.scss';
import capitalizeFirstLetter from '@tools/capitalizeFirstLetter';
import axios from 'axios';
import { Form, Formik, FormikProps } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import genderButtonList from './genderButtonList';

type PersonalFormFieldsType = {
  gender: string;
  birthday: string;
  country: string;
};
const EditPersonalForm: React.FC<ProfileFormType> = ({ setIsChanged }) => {
  const [countries, setCountries] = useState<{ name: string }[]>(null!);
  const dispatch = useAppDispatch();
  // const [editProfile, result] = useEditProfileMutation();
  const _handleSubmit = (values: PersonalFormFieldsType): void => {
    const fields = {
      ...values,
      birthday: new Date(values.birthday).toLocaleDateString(),
    };
    dispatch(changeUser(fields));
    // editProfile(request);
  };

  const fetchCountries = useCallback(async () => {
    const response = await axios.get(`${BASE_URL}/countries`);
    const data = await response.data;
    setCountries(data);
  }, []);

  // useEffect(() => {
  //   if (result.data && result.isSuccess) {
  //     setIsChanged();
  //   }
  // }, [result]);

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div style={{ width: '90%' }}>
      {/* <FormTitle
        title="Change Personal Info"
        showAlert={!!result.data}
        {...(result.data as DefaultUserResponse)}
      /> */}
      <Formik
        initialValues={{ gender: '', birthday: '', country: '' }}
        onSubmit={_handleSubmit}>
        {(props: FormikProps<PersonalFormFieldsType>) => (
          <Form
            className={superstyles.form}
            onSubmit={props.handleSubmit}>
            <RadioGroupField
              name="gender"
              style={{ margin: '0 auto' }}>
              {genderButtonList.map(({ id, value, label }) => (
                <FormControlLabel
                  key={id}
                  value={value}
                  label={label}
                  sx={{ color: 'var(--color13)' }}
                  control={<Radio sx={styles.radioButton} />}
                />
              ))}
            </RadioGroupField>

            <DatePickerField
              name="birthday"
              label="Your Birthday"
            />

            <SelectField
              name="country"
              label="Country">
              {countries &&
                countries.map((country) => {
                  const name = capitalizeFirstLetter(country.name);
                  return (
                    <MenuItem
                      key={name}
                      value={name}>
                      {name}
                    </MenuItem>
                  );
                })}
            </SelectField>
            <SubmitButton disabled={!(props.isValid && props.dirty)} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPersonalForm;
