import { IListEmptyProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ListEmpty: React.FC<IListEmptyProps> = ({ title }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    color: COLORS.BLACK,
  },
});
