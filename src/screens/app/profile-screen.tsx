import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { IPost, IUser, ProfileScreenProps } from '@/interfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { ProfilePostItem, UserImagePicker } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { AlertModal, PostDetailModal } from '@/components/modals';
import { removeUser } from '@/redux/app-state.slice';
import { useModal } from '@/hooks';
import { PROFILE_SCREEN_DATA } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/services';
import { infoFlash } from '@/helpers/flash-message';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  const [showModal, openModal, closeModal] = useModal();
  const [showDetailsModal, openDetailsModal, closeDetailsModal] = useModal();

  const insets = useSafeAreaInsets();

  const user = useAppSelector((state) => state.appState.user);

  const dispatch = useAppDispatch();
  const [allPosts,setAllPosts] = useState<IPost[]>([])
  const getAllPosts = async () =>{
    const posts:IPost[] = []
    try {
      const userDocRef = await getDocs(query(collection(FIRESTORE_DB, 'posts'),where("userId","==",user?.uid)));
      for(let doccument of userDocRef.docs){
        const postData = await doccument.data() as IPost;
        const userDoc = await getDoc(doc(FIRESTORE_DB, 'users', postData?.userId));
        const userData = userDoc.data() as IUser
        posts.push({...postData,user:userData})
      }
      setAllPosts(posts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(user?.uid){
      getAllPosts()
    }
  },[user?.uid])
  const handleLogout = async () => {
    closeModal();
    await signOut(FIREBASE_AUTH);
    dispatch(removeUser());
  };

  const handleZoomImage = (post: IPost) => {
    setSelectedPost(post);
    openDetailsModal();
  };

  const handleCloseDetailsModal = () => {
    closeDetailsModal();
    setSelectedPost(null);
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
          data={allPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ProfilePostItem post={item} onPress={handleZoomImage} />}
          numColumns={3}
          style={styles.postsGrid}
          contentContainerStyle={{ gap: 1 }}
          columnWrapperStyle={{ gap: 1 }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          onEndReached={() => infoFlash('No more posts to show!')}
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
    backgroundColor: COLORS.WHITE,
  },
});
