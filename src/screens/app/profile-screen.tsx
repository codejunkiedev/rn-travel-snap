import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions, Platform } from 'react-native';
import React, { Fragment, useState } from 'react';
import { IPost, ProfileScreenProps } from '@/interfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { UserImagePicker } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { AlertModal, PostDetailModal } from '@/components/modals';
import { removeUser } from '@/redux/app-state.slice';
import { useModal } from '@/hooks';
import { Image } from 'expo-image';
import { PROFILE_SCREEN_DATA, WIDTH_FOR_WEB } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/services';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  const [showModal, openModal, closeModal] = useModal();
  const [showDetailsModal, openDetailsModal, closeDetailsModal] = useModal();

  const insets = useSafeAreaInsets();

  const user = useAppSelector((state) => state.appState.user);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    closeModal();
    await signOut(FIREBASE_AUTH);
    dispatch(removeUser());
  };

  const handleZoomImage = (post: IPost) => {
    setSelectedPost(post);
    openDetailsModal();
  };

  return (
    <Fragment>
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <View style={styles.infoContainer}>
          <UserImagePicker
            imageUri={user?.profilePicURL || ''}
            name={user?.name || 'John Doe'}
            disabled
            containerStyle={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{user?.name || 'John Doe'}</Text>
            <Text style={styles.email}>{user?.email || 'johndoe@gmail.com'}</Text>
          </View>
          <TouchableOpacity onPress={openModal}>
            <Ionicons name='settings' size={24} color={COLORS.SECONDARY} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={PROFILE_SCREEN_DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleZoomImage(item)} style={styles.post} activeOpacity={0.8}>
              <Image
                style={{ flex: 1 }}
                source={{ uri: item.imageURL }}
                contentFit='cover'
                transition={500}
                cachePolicy={'memory-disk'}
                placeholder={'https://placehold.co/400'}
                placeholderContentFit='cover'
              />
            </TouchableOpacity>
          )}
          numColumns={3}
          style={styles.postsGrid}
        />
      </View>
      <PostDetailModal isVisible={showDetailsModal} onClose={closeDetailsModal} selectedPost={selectedPost} />
      <AlertModal
        isVisible={showModal}
        onClose={closeModal}
        title='Logout'
        message='Are you sure you want to logout?'
        buttons={[
          { text: 'No', onPress: closeModal },
          { text: 'Yes', onPress: handleLogout, style: 'destructive' },
        ]}
      />
    </Fragment>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  email: {
    fontSize: FONT_SIZE.SMALL,
  },
  name: {
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    fontSize: FONT_SIZE.MEDIUM,
  },
  postsGrid: {
    flex: 1,
  },
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
