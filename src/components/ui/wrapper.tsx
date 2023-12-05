import React, { Fragment, PropsWithChildren } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WIDTH_FOR_WEB, isDeviceWeb } from '@/constants';
import { COLORS } from '@/typography';

const { height } = Dimensions.get('window');

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  if (isDeviceWeb) {
    return (
      <View style={styles.root}>
        <View style={styles.webWrapper}>{children}</View>
      </View>
    );
  }
  return <Fragment>{children}</Fragment>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
  webWrapper: {
    width: WIDTH_FOR_WEB,
    height: height,
    flex: 1,
  },
});
