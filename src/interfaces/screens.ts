import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from './navigation';
import { AppScreens, AuthScreens } from '@/constants/screens';

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, AuthScreens.LOGIN>;
export type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, AuthScreens.REGISTER>;
