import React, { PropsWithChildren } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import { InputType } from '@models/formModels';
import { useField } from 'formik';

type RadioGroupFieldProps = RadioGroupProps & InputType & {};

const RadioGroupField: React.FC<PropsWithChildren<RadioGroupFieldProps>> = ({
  name,
  label,
  children,
  ...rest
}) => {
  const [field, meta] = useField({ name: name });
  const { isError, helperText } = _textFieldPropsHelper();

  function _textFieldPropsHelper() {
    const { touched, error } = meta;

    const isError = touched && !!error;
    const helperText = touched && error;

    return { isError, helperText };
  }

  return (
    <FormControl>
      <FormLabel
        id={label}
        style={{ margin: '0 auto', color: 'var(--color13)' }}
      >
        Gender
      </FormLabel>
      <RadioGroup row aria-labelledby={label} {...field} {...rest}>
        {children}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupField;
