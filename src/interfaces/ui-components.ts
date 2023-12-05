import { KeyboardType, ModalProps, TextInputProps } from 'react-native';
import { ButtonMode, TextStyleProp, ViewStyleProp } from './components';

export interface ILabeledInputProps {
  label: string;
  value: TextInputProps['value'];
  showTextCounter?: boolean;

  onChangeText: TextInputProps['onChangeText'];
  onBlur?: TextInputProps['onBlur'];
  onFocus?: TextInputProps['onFocus'];
  placeholder?: TextInputProps['placeholder'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
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

  labelStyle?: TextStyleProp;
  inputStyle?: TextStyleProp;
  containerStyle?: ViewStyleProp;

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

export interface IFABProps {
  onPress: () => void;
  icon: React.ReactNode;
  style?: ViewStyleProp;
}

export interface IHeaderProps {}

export interface IWrapperProps {}

export interface IModalProps {
  isVisible: boolean;
  onClose: () => void;

  transparent?: ModalProps['transparent'];
  animationType?: ModalProps['animationType'];
  statusBarTranslucent?: ModalProps['statusBarTranslucent'];
  modalStyle?: ViewStyleProp;
}