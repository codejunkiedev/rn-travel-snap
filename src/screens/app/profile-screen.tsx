import { FlatList, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Fragment, useCallback, useState } from 'react';
import { IPost, IUser, ProfileScreenProps } from '@/interfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { ProfilePostItem, UserImagePicker } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { AlertModal, PostDetailModal } from '@/components/modals';
import { removeUser } from '@/redux/app-state.slice';
import { useLoading, useModal } from '@/hooks';
import { PROFILE_SCREEN_DATA } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/services';
import { infoFlash, warningFlash } from '@/helpers/flash-message';
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { ListEmpty } from '@/components/ui/list-empty';

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);

  const [showModal, openModal, closeModal] = useModal();
  const [showDetailsModal, openDetailsModal, closeDetailsModal] = useModal();
  const [loading, setLoading] = useLoading();

  const insets = useSafeAreaInsets();

  // get redux state for user
  const user = useAppSelector((state) => state.appState.user);

  const dispatch = useAppDispatch();

  // get all posts from firestore
  const getAllPosts = async () => {
    const posts: IPost[] = [];
    try {
      setLoading(true);
      const userDocRef = await getDocs(query(collection(FIRESTORE_DB, 'posts'), orderBy('createdAt', 'desc')));
      // const userDocRef = await getDocs(query(collection(FIRESTORE_DB, 'posts'), where('userId', '==', user?.uid)));
      for (let document of userDocRef.docs) {
        const postData = (await document.data()) as IPost;
        const userDoc = await getDoc(doc(FIRESTORE_DB, 'users', postData?.userId));
        const userData = userDoc.data() as IUser;
        posts.push({ ...postData, user: userData });
      }
      const filter = posts.filter((post) => post.userId === user?.uid);
      setAllPosts(filter);
    } catch (error) {
      warningFlash('Failed to fetch posts');
      console.warn('Failed to fetch posts', error);
    } finally {
      setLoading(false);
    }
  };

  // get all posts on screen focus
  useFocusEffect(
    useCallback(() => {
      getAllPosts();
    }, [])
  );

  // logout user
  const handleLogout = async () => {
    closeModal();
    await signOut(FIREBASE_AUTH);
    dispatch(removeUser());
  };

  // show post in full screen details modal
  const handleZoomImage = (post: IPost) => {
    setSelectedPost(post);
    openDetailsModal();
  };

  // close details modal
  const handleCloseDetailsModal = () => {
    closeDetailsModal();
    setSelectedPost(null);
  };

  return (
    <Fragment>
      <View style={{ paddingTop: insets.top }} className='flex-1 bg-gray-200'>
        <View className='flex-row items-center m-2'>
          <UserImagePicker
            imageUri={user?.profilePicURL || ''}
            name={user?.name || 'John Doe'}
            disabled
            containerStyle='w-20 h-20'
          />
          <View className='flex-1 justify-center pl-2'>
            <Text className='font-bold text-md'>{user?.name || 'John Doe'}</Text>
            <Text className='text-sm'>{user?.email || 'johndoe@gmail.com'}</Text>
          </View>
          <TouchableOpacity onPress={openModal}>
            <Ionicons name='settings' size={24} color={COLORS.SECONDARY} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={allPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ProfilePostItem post={item} onPress={handleZoomImage} />}
          numColumns={3}
          className='flex-1'
          contentContainerStyle={{ gap: 1 }}
          columnWrapperStyle={{ gap: 1 }}
          showsVerticalScrollIndicator={Platform.OS === 'web'}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          onEndReached={() => allPosts.length > 0 && infoFlash('No more posts to show!')}
          ListEmptyComponent={() => !loading && <ListEmpty title='No posts yet' />}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={getAllPosts} />}
        />
      </View>
      <PostDetailModal
        isVisible={showDetailsModal && !!selectedPost}
        onClose={handleCloseDetailsModal}
        selectedPost={selectedPost}
      />
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
