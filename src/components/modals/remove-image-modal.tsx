import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IRemoveImageModalProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { Button, Modal } from '../ui';
import { MaterialIcons } from '@expo/vector-icons';

export const RemoveImageModal: React.FC<IRemoveImageModalProps> = ({ isVisible, onClose, onRemoveImage }) => {
  return (
    <Modal modalStyle={styles.modal} isVisible={isVisible} onClose={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Remove Image</Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={onRemoveImage}>
            <MaterialIcons name='delete' size={30} color={COLORS.DANGER} />
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
        <Button onPress={onClose} title='Cancel' buttonStyle={{ marginHorizontal: 0 }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '30%',
    width: '100%',
    justifyContent: 'space-between',
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
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    color: COLORS.DANGER,
  },
});
