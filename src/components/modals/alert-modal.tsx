import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Modal } from '../ui';
import { IAlertModalProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';

// React Native Alerts does not work on Web
// Hence this Alert Modal that will achieve same functionality

export const AlertModal: React.FC<IAlertModalProps> = ({ isVisible, onClose, buttons, title, message }) => {
  return (
    <Modal modalStyle={styles.modal} isVisible={isVisible} onClose={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{title}</Text>
        {message && <Text style={styles.message}>{message}</Text>}
        <View style={styles.buttonsRow}>
          {buttons.map((button, index) => (
            <Button
              key={index}
              onPress={() => button.onPress?.()}
              title={button.text ?? 'Button'}
              mode='text'
              textStyle={[
                styles.buttonText,
                { color: button.style === 'destructive' ? COLORS.DANGER : COLORS.SECONDARY },
              ]}
              buttonStyle={[styles.button, { minWidth: `${100 / buttons.length}%` }]}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 10,
    elevation: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: FONT_SIZE.LARGE,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  message: {
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
  button: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  buttonText: {
    fontSize: FONT_SIZE.LARGE,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    textAlign: 'center',
    textAlignVertical: 'center',
    textTransform: 'uppercase',
  },
});
