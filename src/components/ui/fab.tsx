import { IFABProps } from '@/interfaces';
import { COLORS } from '@/typography';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

// Floating Action Button component

export const FAB: React.FC<IFABProps> = ({ icon, onPress, style }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        tw`w-12 h-12 rounded-full z-10 absolute bottom-3 right-3 justify-center items-center elevation-5 shadow`,
        styles.root,
        style,
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.SECONDARY,
    elevation: 5,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
  },
});
