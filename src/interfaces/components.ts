import React from 'react';
import type { ViewStyle, TextStyle, KeyboardType, TextInputProps, AlertButton, ModalProps } from 'react-native';
import { IPost } from './common';

type ViewStyleProp = ViewStyle | ViewStyle[];
type TextStyleProp = TextStyle | TextStyle[];

type ButtonMode = 'contained' | 'outlined' | 'text';

export interface ILabeledInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  textContentType?: TextInputProps['textContentType'];
  keyboardAppearance?: TextInputProps['keyboardAppearance'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: TextInputProps['autoCorrect'];
  multiline?: TextInputProps['multiline'];
  numberOfLines?: TextInputProps['numberOfLines'];
  maxLength?: TextInputProps['maxLength'];
  editable?: TextInputProps['editable'];
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  blurOnSubmit?: TextInputProps['blurOnSubmit'];
  textAlign?: TextInputProps['textAlign'];
  textAlignVertical?: TextInputProps['textAlignVertical'];
  showTextCounter?: boolean;

  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;

  touched?: boolean;
  error?: string;
}

export interface IButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyleProp;
  textStyle?: TextStyleProp;
  isLoading?: boolean;
  mode?: ButtonMode;
}

export interface IAvatarProps {
  name: string;
}

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

interface ExtendableModalProps {
  isVisible: boolean;
  onClose: () => void;
  onShow?: ModalProps['onShow'];
  onDismiss?: ModalProps['onDismiss'];
}

export interface IModalProps extends ExtendableModalProps {
  modalStyle?: ViewStyleProp;
  transparent?: ModalProps['transparent'];
  animationType?: ModalProps['animationType'];
  statusBarTranslucent?: ModalProps['statusBarTranslucent'];
}

export interface IImagePickerModalProps extends ExtendableModalProps {
  onPressCamera: () => void;
  onPressGallery: () => void;
}

export interface IRemoveImageModalProps extends ExtendableModalProps {
  onRemoveImage: () => void;
}

export interface IAlertModalProps extends ExtendableModalProps {
  title: string;
  message?: string;
  buttons: AlertButton[];
}

export interface IFABProps {
  onPress: () => void;
  icon: React.ReactNode;
  style?: ViewStyleProp;
}

export interface IPostDetailModalProps extends ExtendableModalProps {
  selectedPost: IPost | null;
}
