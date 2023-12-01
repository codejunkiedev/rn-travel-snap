import type { ViewStyle, TextStyle, KeyboardType, TextInputProps, AlertButton, ModalProps } from 'react-native';

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

export interface IModalProps {
  isVisible: boolean;
  onClose: () => void;
  modalStyle?: ViewStyleProp;
  transparent?: ModalProps['transparent'];
  animationType?: ModalProps['animationType'];
  statusBarTranslucent?: ModalProps['statusBarTranslucent'];
  onShow?: ModalProps['onShow'];
  onDismiss?: ModalProps['onDismiss'];
}

type ExtendableModalProps = Omit<IModalProps, 'modalStyle'>;

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
