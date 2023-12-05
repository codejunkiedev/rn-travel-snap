import { IPostDetailModalProps } from '@/interfaces';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FAB, Modal } from '../ui';
import { Image } from 'expo-image';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { Ionicons } from '@expo/vector-icons';

const des = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.';

export const PostDetailModal: React.FC<IPostDetailModalProps> = ({ isVisible, onClose, selectedPost }) => {
  return (
    <Modal modalStyle={styles.modal} isVisible={isVisible} onClose={onClose}>
      <View style={styles.modalContent}>
        <Image
          source={{ uri: selectedPost?.imageURL }}
          contentFit='cover'
          placeholder={'https://placehold.co/400'}
          placeholderContentFit='cover'
          style={styles.image}
          cachePolicy={'memory-disk'}
        />
        <Text style={styles.description}>{selectedPost?.content ?? des}</Text>
        <FAB onPress={onClose} style={styles.fab} icon={<Ionicons name='close' size={22} color={COLORS.WHITE} />} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  description: {
    margin: 10,
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.SMALL,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    textAlign: 'left',
  },
  fab: {
    position: 'absolute',
    bottom: undefined,
    top: 10,
    width: 30,
    height: 30,
  },
});
