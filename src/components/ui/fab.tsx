import { IFABProps } from '@/interfaces';
import { COLORS } from '@/typography';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Floating Action Button component

export const FAB: React.FC<IFABProps> = ({ icon, onPress, style }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.root, style]}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    zIndex: 1,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
  },
});
