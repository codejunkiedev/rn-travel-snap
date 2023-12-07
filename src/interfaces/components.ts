import type { ViewStyle, TextStyle } from 'react-native';
import { IPost } from './common';

export type ViewStyleProp = ViewStyle | ViewStyle[];
export type TextStyleProp = TextStyle | TextStyle[];

export type ButtonMode = 'contained' | 'outlined' | 'text';

// this file contains the interfaces for the components

export interface IUserImagePickerProps {
  imageUri: string;
  name: string;
  onImageSelected?: (imageUri: string) => void;
  containerStyle?: ViewStyleProp;
  disabled?: boolean;
}

export interface IImagePickerProps {
  imageUri: string;
  onImageSelected?: (imageUri: string) => void;
  containerStyle?: ViewStyleProp;
  disabled?: boolean;
}

export interface IFeedPostItemProps {
  post: IPost;
  onPress: (post: IPost) => void;
}

export interface IProfilePostItemProps {
  post: IPost;
  onPress: (post: IPost) => void;
}
