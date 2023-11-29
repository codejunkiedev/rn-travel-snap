import { AppScreens, AuthScreens } from '@/constants/screens';

export type AuthStackParamList = {
  [AuthScreens.LOGIN]: undefined;
  [AuthScreens.REGISTER]: undefined;
};
