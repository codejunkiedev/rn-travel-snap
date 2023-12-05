import { AlertButton } from 'react-native';
import { IPost } from './common';
import { IModalProps } from './ui-components';

type ExtendableModalProps = Pick<IModalProps, 'isVisible' | 'onClose'>;

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

export interface IPostDetailModalProps extends ExtendableModalProps {
  selectedPost: IPost | null;
}
