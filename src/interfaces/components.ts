import type { ViewStyle, TextStyle, KeyboardType, TextInputProps } from 'react-native';

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
