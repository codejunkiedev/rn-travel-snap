import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IImagePickerModalProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { Button, Modal } from '../ui';
import { Entypo } from '@expo/vector-icons';
import tw from 'twrnc';

// modal to choose image from camera or gallery

export const ImagePickerModal: React.FC<IImagePickerModalProps> = ({
  isVisible,
  onClose,
  onPressCamera,
  onPressGallery,
}) => {
  return (
    <Modal modalStyle={tw`justify-end`} isVisible={isVisible} onClose={onClose}>
      <View style={[tw`h-1/3 w-full justify-around bg-white p-3 rounded-t-4`]}>
        <Text style={[tw`text-lg text-center`, { fontFamily: FONT_FAMILY.POPPINS_BOLD }]}>Choose Image</Text>
        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity style={tw`items-center w-2/4.5`} onPress={onPressCamera}>
            <Entypo name='camera' size={30} color={COLORS.SECONDARY} />
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`items-center w-2/4.5`} onPress={onPressGallery}>
            <Entypo name='folder' size={30} color={COLORS.SECONDARY} />
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
        </View>
        <Button onPress={onClose} title='Cancel' buttonStyle={{ marginHorizontal: 0, marginVertical: 0 }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    color: COLORS.SECONDARY,
  },
});
