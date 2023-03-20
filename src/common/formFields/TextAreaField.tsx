import React from 'react';
import { InputType } from 'models/formModels';
import styles from 'common/formFields/styles';
import { useField } from 'formik';

type TextAreaFieldProps = InputType & {};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  ...rest
}) => {
  const [field, _] = useField({ name: name });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        textTransform: 'capitalize',
      }}
    >
      <label style={{ color: 'var(--color97)' }}>{label}</label>
      <textarea
        style={styles.textareaStyles as React.CSSProperties}
        {...field}
        {...rest}
      />
    </div>
  );
};

export default TextAreaField;
