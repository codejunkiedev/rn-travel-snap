import { IPostDetailModalProps } from '@/interfaces';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FAB, Modal } from '../ui';
import { Image } from 'expo-image';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IMAGES } from '@/constants';
import tw from 'twrnc';

const des = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.';

// full screen details modal to show details of a post

export const PostDetailModal: React.FC<IPostDetailModalProps> = ({ isVisible, onClose, selectedPost }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal modalStyle={tw`flex-1 bg-black`} isVisible={isVisible} onClose={onClose}>
      <View style={[tw`flex-1 justify-center`, { marginTop: insets.top, marginBottom: insets.bottom }]}>
        <FAB
          onPress={onClose}
          style={tw`absolute top-0 left-0 w-15 h-15 bg-black opacity-50`}
          icon={<Ionicons name='close' size={24} color={COLORS.WHITE} />}
        />
        <Image
          source={{ uri: selectedPost?.imageURL }}
          contentFit='cover'
          placeholder={'https://placehold.co/400'}
          placeholderContentFit='cover'
          style={tw`w-full aspect-1`}
          cachePolicy={'memory-disk'}
        />
        <View style={tw`absolute bottom-0 bg-black bg-opacity-70 p-3 w-full`}>
          <View style={tw`flex-row items-center`}>
            <Image
              source={{ uri: selectedPost?.user?.profilePicURL }}
              contentFit='cover'
              cachePolicy={'memory-disk'}
              placeholder={IMAGES.USER}
              placeholderContentFit='cover'
              style={tw`w-8 h-8 rounded-25 mr-3`}
            />
            <Text style={[tw`text-white text-sm`, { fontFamily: FONT_FAMILY.POPPINS_BOLD }]}>
              {selectedPost?.user?.name}
            </Text>
          </View>
          <Text style={[tw`text-white text-sm text-left mt-3`, { fontFamily: FONT_FAMILY.POPPINS_REGULAR }]}>
            {selectedPost?.content ?? des}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
