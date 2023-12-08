import { IListEmptyProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from 'twrnc';

// list empty component

export const ListEmpty: React.FC<IListEmptyProps> = ({ title }) => {
  return (
    <View style={[tw`w-full mt-5`]}>
      <Text style={[tw`text-center text-lg text-black`, { fontFamily: FONT_FAMILY.POPPINS_BOLD }]}>{title}</Text>
    </View>
  );
};
