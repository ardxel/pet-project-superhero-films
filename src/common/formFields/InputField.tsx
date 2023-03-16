import React, { memo } from 'react';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { InputType } from 'models/formModels';

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

  const style = {
    '& label.Mui-focused': {
      color: 'var(--color13)',
    },
    '& label': {
      color: 'var(--color97)',
    },
    '& .MuiOutlinedInput-root': {
      color: 'var(--color13)',
      '&:hover fieldset': {
        borderColor: 'var(--color93)',
        borderWidth: '2px',
      },
      '& fieldset': {
        borderColor: 'var(--color13)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--color13)',
      },
      svg: {
        fill: 'var(--color97)',
      },
    },
  };
  return (
    <TextField
      variant="outlined"
      label={label}
      type={type}
      {...field}
      {...rest}
      error={isError}
      helperText={helperText}
      sx={style}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{adornment}</InputAdornment>
        ),
      }}
    />
  );
};

export default memo(InputField);
