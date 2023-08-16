import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import FeedIcon from '@mui/icons-material/Feed';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
const fieldKit = {
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
  emailOrUsername: {
    name: 'login',
    type: 'text',
    label: 'email or username',
    Adornment: MailOutlineIcon,
  },
  biography: {
    name: 'biography',
    label: 'bio',
    Adornment: FeedIcon,
  },
  avatar: {
    name: 'avatar',
    label: 'avatar',
    Adornment: AccountBoxIcon,
  },
  name: {
    name: 'name',
    label: 'your name',
    Adornment: DescriptionIcon,
  },
};

export default fieldKit;
