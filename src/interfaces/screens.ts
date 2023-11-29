import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from './navigation';
import { AppScreens } from '@/constants/screens';

export type FeedScreenProps = NativeStackScreenProps<AppStackParamList, AppScreens.FEED>;
export type AuthScreenProps = NativeStackScreenProps<AppStackParamList, AppScreens.AUTH>;
