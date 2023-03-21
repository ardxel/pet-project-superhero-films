import React from 'react';
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import styles from './styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { InputType } from 'models/formModels';
import { useField, useFormikContext } from 'formik';
import { FormControl, FormLabel } from '@mui/material';

type DatePickerFieldProps = InputType & DatePickerProps<AdapterDayjs> & {};

const DatePickerField: React.FC<DatePickerFieldProps> = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({ name: props.name });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <FormControl>
          <FormLabel style={{ margin: '0 auto', color: 'var(--color13)' }}>
            {props.label}
          </FormLabel>
          <DatePicker
            sx={{ ...styles.textField, marginTop: '1em' }}
            {...field}
            {...props}
            onChange={(val) => {
              console.log(new Date(val).toLocaleDateString('en-US'));
              setFieldValue(field.name, val);
            }}
          />
        </FormControl>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerField;
