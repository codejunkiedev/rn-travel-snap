import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AppBottomTabParamList, AuthStackParamList } from './navigation';
import { AppScreens, AuthScreens } from '@/constants';

// this file contains the interfaces for the screens

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, AuthScreens.LOGIN>;
export type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, AuthScreens.REGISTER>;

export type FeedScreenProps = BottomTabScreenProps<AppBottomTabParamList, AppScreens.FEED>;
export type AddPostScreenProps = BottomTabScreenProps<AppBottomTabParamList, AppScreens.ADD_POST>;
export type ProfileScreenProps = BottomTabScreenProps<AppBottomTabParamList, AppScreens.PROFILE>;
