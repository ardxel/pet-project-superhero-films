import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default {
  email: {
    name: 'email',
    type: 'email',
    label: 'email*',
    Adornment: MailOutlineIcon,
  },
  username: {
    name: 'username',
    type: 'text',
    label: 'username*',
    Adornment: AccountCircleOutlinedIcon,
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'password*',
    Adornment: VisibilityOutlinedIcon,
    AddAdornment: VisibilityOffIcon,
  },
  confirm_password: {
    name: 'confirm_password',
    type: 'password',
    label: 'confirm password*',
    Adornment: VisibilityOutlinedIcon,
    AddAdornment: VisibilityOffIcon,
  },
};
