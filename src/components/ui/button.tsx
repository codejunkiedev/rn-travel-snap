import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { IButtonProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';

// button component

export const Button: React.FC<IButtonProps> = ({
  onPress,
  isLoading,
  title,
  mode = 'contained',
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[containerStyles.container, containerStyles[mode], buttonStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator size='small' color={COLORS.WHITE} />
      ) : (
        <Text style={[labelStyles.label, labelStyles[mode], textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    minHeight: 45,
    minWidth: 100,
    justifyContent: 'center',
  },
  contained: {
    backgroundColor: COLORS.PRIMARY,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
  },
  outlined: {
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  text: {
    backgroundColor: COLORS.TRANSPARENT,
  },
});

const labelStyles = StyleSheet.create({
  label: {
    fontSize: FONT_SIZE.MEDIUM,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  contained: {
    color: COLORS.WHITE,
  },
  outlined: {
    color: COLORS.PRIMARY,
  },
  text: {
    color: COLORS.PRIMARY,
  },
});
