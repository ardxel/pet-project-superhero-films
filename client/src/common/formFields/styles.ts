const styles = {
  textField: {
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
  textarea: {
    resize: 'none',
    color: 'var(--color13)',
    backgroundColor: 'var(--color1)',
    borderColor: 'var(--color13)',
    borderRadius: '4px',
    padding: '16.5px 14px',
  },
  radioButton: {
    '& label': {
      color: 'var(--color13)',
    },
    '&, &.Mui-checked': {
      color: 'var(--color3)',
    },
  },
  selectField: {
    color: 'var(--color13)',
    '&.MuiInputBase-root fieldset legend span': {
      color: 'var(--color13)',
    },
    '&.MuiInputBase-root fieldset': {
      borderColor: 'var(--color13)',
      color: 'var(--color13)'
    },
    '&.MuiInputBase-root.Mui-focused fieldset': {
      borderColor: 'var(--color93)',
      color: 'var(--color13)'
    },
    '&.MuiInputBase-root:hover fieldset': {
      borderColor: 'var(--color93)',
      color: 'var(--color13)'
    },
  },
  menu: {
    '& .MuiPaper-root': {
      backgroundColor: 'var(--color31)',
    },
  },
};

export default styles;
