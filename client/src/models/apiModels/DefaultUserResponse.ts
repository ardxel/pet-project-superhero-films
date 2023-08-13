import { AlertColor } from '@mui/material';
import { UserReduxState } from '@models/User';

export type DefaultUserResponse = {
  severity?: AlertColor;
  message?: string;
  user: UserReduxState | null;
};
