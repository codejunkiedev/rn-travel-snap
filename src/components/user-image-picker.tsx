import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { IUserImagePickerProps } from '@/interfaces';
import { Avatar } from './ui';
import { Image } from 'expo-image';
import { IMAGES } from '@/constants';
import { pickImageFromCamera, pickImageFromLibrary } from '@/helpers/image-picker';
import { COLORS } from '@/typography';

export const UserImagePicker: React.FC<IUserImagePickerProps> = ({
  imageUri,
  name,
  onImageSelected,
  containerStyle,
  disabled,
}) => {
  let component = null;

  if (imageUri) {
    component = <Image source={{ uri: imageUri }} style={{ flex: 1 }} />;
  } else if (name) {
    component = <Avatar name={name} />;
  } else {
    component = <Image source={IMAGES.USER} style={{ flex: 1 }} />;
  }

  const handlePickImageFromLibrary = async () => {
    const result = await pickImageFromLibrary();
    if (result) {
      onImageSelected?.(result);
    }
  };

  const handlePickImageFromCamera = async () => {
    const result = await pickImageFromCamera();
    if (result) {
      onImageSelected?.(result);
    }
  };

  const handleOnPress = () => {
    if (imageUri) {
      Alert.alert('Remove Image', 'Are you sure you want to remove image?', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => onImageSelected?.(''),
          style: 'destructive',
        },
      ]);
    } else {
      Alert.alert('Select image', 'Select image from', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Camera',
          onPress: handlePickImageFromCamera,
          style: 'default',
        },
        {
          text: 'Gallery',
          onPress: handlePickImageFromLibrary,
          isPreferred: true,
          style: 'default',
        },
      ]);
    }
  };

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} disabled={disabled ?? false} onPress={handleOnPress}>
      {component}
    </TouchableOpacity>
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
