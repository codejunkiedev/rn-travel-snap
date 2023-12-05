import { StyleSheet, Modal as RN_Modal, View, Platform, Dimensions } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { IModalProps } from '@/interfaces';
import { WIDTH_FOR_WEB } from '@/constants';

const { width, height } = Dimensions.get('window');

export const Modal: React.FC<PropsWithChildren<IModalProps>> = ({
  isVisible,
  animationType,
  onClose,
  statusBarTranslucent,
  transparent,
  children,
  modalStyle,
}) => {
  return (
    <RN_Modal
      visible={isVisible}
      transparent={transparent ?? true}
      animationType={animationType ?? 'fade'}
      statusBarTranslucent={statusBarTranslucent ?? true}
      onRequestClose={onClose}
    >
      <View style={[styles.modal, modalStyle]}>{children}</View>
    </RN_Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...Platform.select({
      web: {
        width: WIDTH_FOR_WEB,
        height: height,
        alignSelf: 'center',
      },
      default: {
        height: height,
        width: width,
        flex: 1,
      },
    }),
  },
});
