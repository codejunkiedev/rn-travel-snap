import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import React from 'react';
import { View, Text } from 'react-native';
import { IHeaderProps } from '@/interfaces';
import tw from 'twrnc';

// header component with App Name

export const Header: React.FC<IHeaderProps> = ({}) => {
  return (
    <View style={[tw`w-full p-3 items-center`, { backgroundColor: COLORS.PRIMARY }]}>
      <Text style={[tw`text-white text-xl`, { fontFamily: FONT_FAMILY.POPPINS_BOLD_ITALIC }]}>Travel Snap</Text>
    </View>
  );
};
