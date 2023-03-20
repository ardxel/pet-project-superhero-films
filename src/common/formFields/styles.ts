const styles = {
  textFieldStyles: {
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
  },
  textareaStyles: {
    resize: 'none',
    color: 'var(--color13)',
    backgroundColor: 'var(--color1)',
    borderColor: 'var(--color13)',
    borderRadius: '4px',
    padding: '16.5px 14px',
  },
};

export default styles;
