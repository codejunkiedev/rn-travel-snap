import { IFeedPostItemProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { Image } from 'expo-image';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const FeedPostItem: React.FC<IFeedPostItemProps> = React.memo(({ post: item, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)} style={styles.feedItem}>
      <View style={styles.userRow}>
        <Image
          style={styles.userImage}
          source={{ uri: item.user.profilePicURL }}
          contentFit='cover'
          placeholder={'https://placehold.co/400'}
          placeholderContentFit='cover'
          transition={300}
          cachePolicy={'memory-disk'}
        />
        <Text style={styles.userName}>{item.user.name}</Text>
      </View>
      <View style={styles.postCol}>
        <Image
          style={styles.postImage}
          source={{ uri: item.imageURL }}
          contentFit='cover'
          placeholder={'https://placehold.co/400'}
          placeholderContentFit='cover'
          transition={300}
          cachePolicy={'memory-disk'}
        />
      </View>
      <Text style={styles.postCaption}>{item.content}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  feedItem: {
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: FONT_SIZE.SMALL,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
  postCol: {
    width: '100%',
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
  postCaption: {
    fontSize: FONT_SIZE.SMALL,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    marginTop: 10,
  },
});
