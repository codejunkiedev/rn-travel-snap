import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IHeaderProps } from '@/interfaces';

export const Header: React.FC<IHeaderProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Travel Snap</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  appName: {
    fontFamily: FONT_FAMILY.POPPINS_BOLD_ITALIC,
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.EXTRA_LARGE,
  },
});
