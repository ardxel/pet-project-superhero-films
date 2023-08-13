import React, { PropsWithChildren } from 'react';
import {
  FormControl,
  FormHelperText,
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

  const isError = meta.touched && meta.error && true;

  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{meta.error}</FormHelperText>;
    }
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
      {_renderHelperText()}
    </FormControl>
  );
};

export default RadioGroupField;
