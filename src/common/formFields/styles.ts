const textFieldStyles = {
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

export default textFieldStyles;
