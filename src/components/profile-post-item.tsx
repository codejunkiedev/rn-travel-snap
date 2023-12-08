import { WIDTH_FOR_WEB } from '@/constants';
import { IProfilePostItemProps } from '@/interfaces';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import tw from 'twrnc';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// render item for Profile Screen

export const ProfilePostItem: React.FC<IProfilePostItemProps> = React.memo(({ post: item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.post} activeOpacity={0.8}>
      <Image
        style={tw`flex-1`}
        source={{ uri: item?.imageURL || '' }}
        contentFit='cover'
        transition={500}
        cachePolicy={'memory-disk'}
        placeholder={'https://placehold.co/400'}
        placeholderContentFit='cover'
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  post: {
    ...Platform.select({
      web: {
        width: WIDTH_FOR_WEB / 3,
      },
      default: {
        width: SCREEN_WIDTH / 3,
      },
    }),
    aspectRatio: 1,
  },
});
