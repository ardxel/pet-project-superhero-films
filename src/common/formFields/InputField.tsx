import React, { memo } from 'react';
import {
  InputAdornment,
  SvgIconProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useField } from 'formik';
import { InputType } from '../../models/formModels';

// const styles = {
//   inputFieldStyles: {
//     width: '100%',
//     maxWidth: '400px',
//     marginRight: 'auto',
//     marginLeft: 'auto'
//   }
// };

type InputFieldProps = TextFieldProps & InputType & {};
const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  label,
  adornment,
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
      label={label}
      type={type}
      {...field}
      error={isError}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{adornment}</InputAdornment>
        ),
      }}
    />
  );
};

export default memo(InputField);
