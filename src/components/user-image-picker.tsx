import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { Fragment, useState } from 'react';
import { IUserImagePickerProps } from '@/interfaces';
import { Avatar } from './ui';
import { Image } from 'expo-image';
import { IMAGES } from '@/constants';
import { pickImageFromCamera, pickImageFromLibrary } from '@/helpers/image-picker';
import { COLORS } from '@/typography';
import { ImagePickerModal, RemoveImageModal } from './modals';

export const UserImagePicker: React.FC<IUserImagePickerProps> = ({
  imageUri,
  name,
  onImageSelected,
  containerStyle,
  disabled,
}) => {
  const [showModal1, setShowModal1] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);

  let component = null;

  if (imageUri) {
    component = <Image source={{ uri: imageUri }} style={{ flex: 1 }} />;
  } else if (name) {
    component = <Avatar name={name} />;
  } else {
    component = <Image source={IMAGES.USER} style={{ flex: 1 }} />;
  }

  const closeModal1 = () => setShowModal1(false);
  const closeModal2 = () => setShowModal2(false);

  const handlePickImageFromLibrary = async () => {
    closeModal1();
    const result = await pickImageFromLibrary();
    if (result) {
      onImageSelected?.(result);
    }
  };

  const handlePickImageFromCamera = async () => {
    closeModal1();
    const result = await pickImageFromCamera();
    if (result) {
      onImageSelected?.(result);
    }
  };

  const handleRemoveImage = () => {
    closeModal2();
    onImageSelected?.('');
  };

  const handleOnPress = () => {
    if (imageUri) {
      setShowModal2(true);
    } else {
      setShowModal1(true);
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
        onClose={() => setShowModal1(false)}
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
