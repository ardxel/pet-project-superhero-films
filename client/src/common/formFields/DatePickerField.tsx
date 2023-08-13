import React from 'react';
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import styles from './styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InputType } from '@models/formModels';
import { useField, useFormikContext } from 'formik';
import { FormControl, FormLabel } from '@mui/material';

type DatePickerFieldProps = InputType & DatePickerProps<AdapterDayjs> & {};

const DatePickerField: React.FC<DatePickerFieldProps> = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({ name: props.name });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl>
        <FormLabel style={{ margin: '0 auto', color: 'var(--color13)' }}>
          {props.label}
        </FormLabel>
        <DatePicker
          sx={{ ...styles.textField, marginTop: '1em' }}
          {...field}
          {...props}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
        />
      </FormControl>
    </LocalizationProvider>
  );
};

export default DatePickerField;
