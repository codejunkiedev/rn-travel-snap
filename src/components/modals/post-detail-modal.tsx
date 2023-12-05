import { IPostDetailModalProps } from '@/interfaces';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FAB, Modal } from '../ui';
import { Image } from 'expo-image';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IMAGES } from '@/constants';

const des = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.';

export const PostDetailModal: React.FC<IPostDetailModalProps> = ({ isVisible, onClose, selectedPost }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal modalStyle={styles.modal} isVisible={isVisible} onClose={onClose}>
      <View style={[styles.root, { marginTop: insets.top, marginBottom: insets.bottom }]}>
        <FAB onPress={onClose} style={styles.fab} icon={<Ionicons name='close' size={24} color={COLORS.WHITE} />} />
        <Image
          source={{ uri: selectedPost?.imageURL }}
          contentFit='cover'
          placeholder={'https://placehold.co/400'}
          placeholderContentFit='cover'
          style={styles.image}
          cachePolicy={'memory'}
        />
        <View style={styles.modalContent}>
          <View style={styles.userRow}>
            <Image
              source={{ uri: selectedPost?.user?.profilePicURL }}
              contentFit='cover'
              cachePolicy={'memory'}
              placeholder={IMAGES.USER}
              placeholderContentFit='cover'
              style={styles.userImage}
            />
            <Text style={styles.userName}>{selectedPost?.user?.name}</Text>
          </View>
          <Text style={styles.description}>{selectedPost?.content ?? des}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 10,
    width: '100%',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
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
    color: COLORS.WHITE,
    textAlignVertical: 'center',
  },
  description: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.SMALL,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    textAlign: 'left',
    marginTop: 15,
  },
  fab: {
    position: 'absolute',
    bottom: undefined,
    right: undefined,
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    backgroundColor: COLORS.BLACK,
    opacity: 0.5,
  },
});
