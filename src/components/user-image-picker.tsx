import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { Fragment } from 'react';
import { IUserImagePickerProps } from '@/interfaces';
import { Avatar } from './ui';
import { Image } from 'expo-image';
import { IMAGES } from '@/constants';
import { pickImageFromCamera, pickImageFromLibrary } from '@/helpers/image-picker';
import { COLORS } from '@/typography';
import { ImagePickerModal, RemoveImageModal } from './modals';
import { useModal } from '@/hooks';

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

  const handlePickImageFromLibrary = async () => {
    const result = await pickImageFromLibrary();
    if (result) {
      onImageSelected?.(result);
      closeModal1();
    }
  };

  const handlePickImageFromCamera = async () => {
    const result = await pickImageFromCamera();
    if (result) {
      onImageSelected?.(result);
      closeModal1();
    }
  };

  const handleRemoveImage = () => {
    closeModal2();
    onImageSelected?.('');
  };

  const handleOnPress = () => {
    if (imageUri) {
      openModal2();
    } else {
      openModal1();
    }
  };

  return (
    <Fragment>
      <TouchableOpacity style={[styles.container, containerStyle]} disabled={disabled ?? false} onPress={handleOnPress}>
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

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
    borderRadius: 100,
    alignSelf: 'center',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    backgroundColor: COLORS.WHITE,
  },
});
