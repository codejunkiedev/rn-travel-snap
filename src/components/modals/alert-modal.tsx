import React from 'react';
import { View, Text } from 'react-native';
import { Button, Modal } from '../ui';
import { IAlertModalProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import tw from 'twrnc';

// React Native Alerts does not work on Web
// Hence this Alert Modal that will achieve same functionality

export const AlertModal: React.FC<IAlertModalProps> = ({ isVisible, onClose, buttons, title, message }) => {
  return (
    <Modal modalStyle={tw`justify-center p-3`} isVisible={isVisible} onClose={onClose}>
      <View style={tw`w-full bg-white justify-between p-4 pb-2 elevation-5 rounded-2`}>
        <Text style={[tw`text-lg text-left`, { fontFamily: FONT_FAMILY.POPPINS_BOLD }]}>{title}</Text>
        {message && <Text style={[tw`text-md text-left`, { fontFamily: FONT_FAMILY.POPPINS_REGULAR }]}>{message}</Text>}
        <View style={tw`flex-row justify-between mt-2 w-full`}>
          {buttons.map((button, index) => (
            <Button
              key={index}
              onPress={() => button.onPress?.()}
              title={button.text ?? 'Button'}
              mode='text'
              textStyle={[
                tw`text-lg text-center uppercase`,
                { fontFamily: FONT_FAMILY.POPPINS_BOLD },
                { color: button.style === 'destructive' ? COLORS.DANGER : COLORS.SECONDARY },
              ]}
              buttonStyle={[tw`m-0`, { minWidth: `${100 / buttons.length}%` }]}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};
