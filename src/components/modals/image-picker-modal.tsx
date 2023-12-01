import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IImagePickerModalProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { Button, Modal } from '../ui';
import { Entypo } from '@expo/vector-icons';

export const ImagePickerModal: React.FC<IImagePickerModalProps> = ({
  isVisible,
  onClose,
  onPressCamera,
  onPressGallery,
}) => {
  return (
    <Modal modalStyle={styles.modal} isVisible={isVisible} onClose={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Choose Image</Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={onPressCamera}>
            <Entypo name='camera' size={30} color={COLORS.SECONDARY} />
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressGallery}>
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
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '30%',
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: COLORS.WHITE,
    padding: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  modalTitle: {
    fontSize: FONT_SIZE.LARGE,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    color: COLORS.SECONDARY,
  },
});
