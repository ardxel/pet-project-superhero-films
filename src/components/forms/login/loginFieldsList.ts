import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default {
  inputLogin: {
    name: 'login',
    type: 'text',
    label: 'email or username',
    Adornment: MailOutlineIcon,
  },
  inputPassword: {
    name: 'password',
    type: 'password',
    label: 'password',
    Adornment: VisibilityOutlinedIcon,
    AddAdornment: VisibilityOffIcon,
  },
};
