import { InputType } from '@models/formModels';
import { FormControl, FormLabel, Select, SelectProps } from '@mui/material';
import { useField } from 'formik';
import { PropsWithChildren } from 'react';
import styles from './styles';

type SelectFieldProps = SelectProps & InputType;

const SelectField: React.FC<PropsWithChildren<SelectFieldProps>> = ({ name, children, ...props }) => {
  const [field] = useField({ name: name });

  return (
    <FormControl>
      <FormLabel style={{ margin: '0 auto', color: 'var(--color13)' }}>{props.label}</FormLabel>
      <Select
        variant="outlined"
        {...field}
        {...props}
        sx={{
          ...styles.selectField,
          marginTop: '1em',
        }}>
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectField;
