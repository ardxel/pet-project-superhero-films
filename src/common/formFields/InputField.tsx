import React, { memo } from 'react';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { InputType } from '@models/formModels';
import styles from './styles';

type InputFieldProps = TextFieldProps & InputType & {};
const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  label,
  adornment,
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
    <TextField
      variant="outlined"
      label={label}
      type={type}
      {...field}
      {...rest}
      error={isError}
      helperText={helperText}
      sx={styles.textField}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{adornment}</InputAdornment>
        ),
      }}
    />
  );
};

export default memo(InputField);
