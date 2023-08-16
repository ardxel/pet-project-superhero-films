import { InputType } from '@models/formModels';
import { useField } from 'formik';
import styles from './styles';

type TextAreaFieldProps = InputType;

const TextAreaField: React.FC<TextAreaFieldProps> = ({ name, label, ...rest }) => {
  const [field] = useField({ name: name });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        textTransform: 'capitalize',
      }}>
      <label style={{ color: 'var(--color97)' }}>{label}</label>
      <textarea
        style={styles.textarea as React.CSSProperties}
        {...field}
        {...rest}
      />
    </div>
  );
};

export default TextAreaField;
