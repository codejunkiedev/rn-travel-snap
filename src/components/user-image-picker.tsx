import { TouchableOpacity } from 'react-native';
import React, { Fragment } from 'react';
import { IUserImagePickerProps } from '@/interfaces';
import { Avatar } from './ui';
import { Image } from 'expo-image';
import { IMAGES } from '@/constants';
import { pickImageFromCamera, pickImageFromLibrary } from '@/helpers/image-picker';
import { COLORS } from '@/typography';
import { ImagePickerModal, RemoveImageModal } from './modals';
import { useModal } from '@/hooks';
import tw from 'twrnc';

// image picker component for user picture

export const UserImagePicker: React.FC<IUserImagePickerProps> = ({
  imageUri,
  name,
  onImageSelected,
  containerStyle,
  disabled,
}) => {
  const [showModal1, openModal1, closeModal1] = useModal();
  const [showModal2, openModal2, closeModal2] = useModal();

  let component = null;

  if (imageUri) {
    component = <Image source={{ uri: imageUri }} style={{ flex: 1 }} contentFit='cover' cachePolicy={'memory-disk'} />;
  } else if (name) {
    component = <Avatar name={name} />;
  } else {
    component = <Image source={IMAGES.USER} style={{ flex: 1 }} />;
  }

  // pick image from library
  const handlePickImageFromLibrary = async () => {
    const result = await pickImageFromLibrary();
    if (result) {
      onImageSelected?.(result);
      closeModal1();
    }
  };

  // capture image from camera
  const handlePickImageFromCamera = async () => {
    const result = await pickImageFromCamera();
    if (result) {
      onImageSelected?.(result);
      closeModal1();
    }
  };

  // remove selected image
  const handleRemoveImage = () => {
    closeModal2();
    onImageSelected?.('');
  };

  // show pick image or remove image modal
  const handleOnPress = () => {
    if (imageUri) {
      openModal2();
    } else {
      openModal1();
    }
  };

  return (
    <Fragment>
      <TouchableOpacity
        style={[
          tw`h-32 w-32 rounded-full self-center overflow-hidden elevation-5 shadow-black shadow-offset-0-2 shadow-opacity-25 shadow-radius-5 bg-white`,
          containerStyle,
        ]}
        disabled={disabled ?? false}
        onPress={handleOnPress}
      >
        {component}
      </TouchableOpacity>
      <ImagePickerModal
        isVisible={showModal1}
        onPressCamera={handlePickImageFromCamera}
        onPressGallery={handlePickImageFromLibrary}
        onClose={closeModal1}
      />
      <RemoveImageModal isVisible={showModal2} onClose={closeModal2} onRemoveImage={handleRemoveImage} />
    </Fragment>
  );
};
