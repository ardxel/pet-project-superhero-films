import React, { PropsWithChildren } from 'react';
import { FormControl, FormLabel, Select, SelectProps } from '@mui/material';
import styles from './styles';
import { InputType } from '@models/formModels';
import { useField } from 'formik';

type SelectFieldProps = SelectProps & InputType & {};

const SelectField: React.FC<PropsWithChildren<SelectFieldProps>> = ({
  name,
  children,
  ...props
}) => {
  const [field] = useField({ name: name });

  return (
    <FormControl>
      <FormLabel style={{ margin: '0 auto', color: 'var(--color13)' }}>
        {props.label}
      </FormLabel>
      <Select
        variant="outlined"
        {...field}
        {...props}
        sx={{
          ...styles.selectField,
          marginTop: '1em',
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectField;
