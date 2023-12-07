import { AppScreens, AuthScreens } from '@/constants';
import { ILoginForm } from './payloads';

// this file contains the interfaces for the navigators

export type AuthStackParamList = {
  [AuthScreens.LOGIN]: ILoginForm;
  [AuthScreens.REGISTER]: ILoginForm;
};

export type AppBottomTabParamList = {
  [AppScreens.FEED]: undefined;
  [AppScreens.ADD_POST]: undefined;
  [AppScreens.PROFILE]: undefined;
};
