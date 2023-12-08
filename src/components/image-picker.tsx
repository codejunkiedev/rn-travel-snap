import { IImagePickerProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { ImagePickerModal, RemoveImageModal } from './modals';
import { pickImageFromCamera, pickImageFromLibrary } from '@/helpers/image-picker';
import { useModal } from '@/hooks';
import { WIDTH_FOR_WEB } from '@/constants';
import tw from 'twrnc';

const { width, height } = Dimensions.get('window');

// Image Picker component for add post screen

export const ImagePicker: React.FC<IImagePickerProps> = ({ imageUri, containerStyle, disabled, onImageSelected }) => {
  const [showModal1, openModal1, closeModal1] = useModal();
  const [showModal2, openModal2, closeModal2] = useModal();

  let component = null;

  if (imageUri) {
    component = (
      <Image source={{ uri: imageUri }} style={[tw`flex-1`]} cachePolicy={'memory-disk'} contentFit='cover' />
    );
  } else {
    component = (
      <View style={[tw`flex-1 justify-center items-center`]}>
        <Entypo name='image' size={30} color={COLORS.WHITE} />
        <Text style={[tw`mt-2 text-white text-base`, { fontFamily: FONT_FAMILY.POPPINS_BOLD }]}>Select Image</Text>
      </View>
    );
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
        style={[styles.root, containerStyle]}
        activeOpacity={0.8}
        onPress={handleOnPress}
        disabled={disabled}
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

const styles = StyleSheet.create({
  root: {
    margin: 10,
    aspectRatio: 1,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    ...Platform.select({
      web: {
        width: WIDTH_FOR_WEB - 20,
      },
      default: {
        width: width - 20,
      },
    }),
  },
});
