import { AppScreens, AuthScreens } from '@/constants';
import { ILoginForm } from './payloads';

export type AuthStackParamList = {
  [AuthScreens.LOGIN]: undefined;
  [AuthScreens.REGISTER]: ILoginForm;
};
