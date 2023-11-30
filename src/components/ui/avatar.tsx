import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IAvatarProps } from '@/interfaces';
import { COLORS, FONT_FAMILY } from '@/typography';
import { getInitials } from '@/utils';

export const Avatar: React.FC<IAvatarProps> = ({ name }) => {
  const initials = getInitials(name);
  const fontSize = initials.length > 2 ? 35 : 45;

  return (
    <View style={styles.container}>
      <Text style={[styles.initials, { fontSize: fontSize }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.INFO,
  },
  initials: {
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    color: COLORS.WHITE,
    textAlign: 'center',
    textAlignVertical: 'center',
    textTransform: 'uppercase',
  },
});
