import { AppScreens, AuthScreens } from '@/constants';
import { ILoginForm } from './payloads';

export type AuthStackParamList = {
  [AuthScreens.LOGIN]: undefined;
  [AuthScreens.REGISTER]: ILoginForm;
};

export type AppBottomTabParamList = {
  [AppScreens.FEED]: undefined;
  [AppScreens.ADD_POST]: undefined;
  [AppScreens.PROFILE]: undefined;
};
