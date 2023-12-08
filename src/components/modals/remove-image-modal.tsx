import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IRemoveImageModalProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { Button, Modal } from '../ui';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';

// modal to remove selected image
export const RemoveImageModal: React.FC<IRemoveImageModalProps> = ({ isVisible, onClose, onRemoveImage }) => {
  return (
    <Modal modalStyle={tw`justify-end`} isVisible={isVisible} onClose={onClose}>
      <View style={tw`h-1/3 w-full justify-around bg-white p-3 rounded-t-4`}>
        <Text style={[tw`text-lg text-center`, { fontFamily: FONT_FAMILY.POPPINS_BOLD }]}>Remove Image</Text>
        <View style={tw`flex-row justify-center`}>
          <TouchableOpacity style={tw`items-center w-1/2`} onPress={onRemoveImage}>
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
  buttonText: {
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    color: COLORS.DANGER,
  },
});
