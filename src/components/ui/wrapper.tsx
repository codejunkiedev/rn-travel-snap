import React, { Fragment, PropsWithChildren } from 'react';
import { View, Dimensions } from 'react-native';
import { WIDTH_FOR_WEB, isDeviceWeb } from '@/constants';
import { COLORS } from '@/typography';
import { IWrapperProps } from '@/interfaces';
import tw from 'twrnc';

const { height } = Dimensions.get('window');

// wrapper component to check if platform is web and apply styles to root view

export const Wrapper: React.FC<PropsWithChildren<IWrapperProps>> = ({ children }) => {
  if (isDeviceWeb) {
    return (
      <View style={[tw`flex-1 items-center`, { backgroundColor: COLORS.PRIMARY }]}>
        <View style={[tw`flex-1`, { width: WIDTH_FOR_WEB, height: height }]}>{children}</View>
      </View>
    );
  }
  return <Fragment>{children}</Fragment>;
};
