import { IMAGES } from '@/constants';
import { IFeedPostItemProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { Image } from 'expo-image';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

// Render item for Feed Screen

export const FeedPostItem: React.FC<IFeedPostItemProps> = React.memo(({ post: item, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(item)}
      style={[tw`rounded-2 p-3 elevation-3 bg-white shadow-opacity-0.1 shadow-radius-10 shadow-offset-0-5`]}
    >
      <View style={[tw`flex-row items-center`]}>
        <Image
          style={tw`w-8 h-8 rounded-25 mr-3`}
          source={{ uri: item?.user?.profilePicURL || '' }}
          contentFit='cover'
          placeholder={IMAGES.USER}
          placeholderContentFit='cover'
          transition={300}
          cachePolicy={'memory-disk'}
        />
        <Text style={[tw`text-sm`, { fontFamily: FONT_FAMILY.POPPINS_BOLD }]}>{item?.user?.name || ''}</Text>
      </View>
      <View style={tw`w-full`}>
        <Image
          style={tw`w-full h-80 mt-3 rounded-2`}
          source={{ uri: item?.imageURL || '' }}
          contentFit='cover'
          placeholder={'https://placehold.co/400'}
          placeholderContentFit='cover'
          transition={300}
          cachePolicy={'memory-disk'}
        />
      </View>
      <Text style={[tw`mt-2 text-sm`, { fontFamily: FONT_FAMILY.POPPINS_REGULAR }]}>{item.content}</Text>
    </TouchableOpacity>
  );
});
