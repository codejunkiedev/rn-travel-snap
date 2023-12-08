import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { IAvatarProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { getInitials } from '@/utils';
import tw from 'twrnc';

// create an avatar based on user name

export const Avatar: React.FC<IAvatarProps> = ({ name }) => {
  const initials = useMemo(() => getInitials(name), [name]);
  const fontSize = initials.length > 2 ? FONT_SIZE.SUBHEADER : FONT_SIZE.HEADER;

  return (
    <View style={[tw`flex-1 justify-center items-center`, { backgroundColor: COLORS.INFO }]}>
      <Text
        style={[
          tw`text-white text-center uppercase`,
          { fontFamily: FONT_FAMILY.POPPINS_BOLD, color: COLORS.WHITE, fontSize: fontSize },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
};
