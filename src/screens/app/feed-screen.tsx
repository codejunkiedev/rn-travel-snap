import { FlatList, Platform, RefreshControl, View } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { FeedScreenProps, IPost, IUser } from '@/interfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FAB, Header } from '@/components/ui';
import { AppScreens } from '@/constants';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/typography';
import { FeedPostItem } from '@/components';
import { infoFlash, warningFlash } from '@/helpers/flash-message';
import { PostDetailModal } from '@/components/modals';
import { useLoading, useModal } from '@/hooks';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/services';
import { ListEmpty } from '@/components/ui/list-empty';
import tw from 'twrnc';

const FeedScreen: React.FC<FeedScreenProps> = ({ navigation, route }) => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);

  const [loading, setLoading] = useLoading();
  const [showDetailsModal, openDetailsModal, closeDetailsModal] = useModal();

  // get all posts from firestore
  const getAllPosts = async () => {
    const posts: IPost[] = [];
    try {
      setLoading(true);
      const userDocRef = await getDocs(query(collection(FIRESTORE_DB, 'posts'), orderBy('createdAt', 'desc')));
      for (let document of userDocRef.docs) {
        const postData = (await document.data()) as IPost;
        const userDoc = await getDoc(doc(FIRESTORE_DB, 'users', postData?.userId));
        const userData = userDoc.data() as IUser;
        posts.push({ ...postData, user: userData });
      }
      setAllPosts(posts);
    } catch (error) {
      warningFlash('Failed to fetch posts');
      console.warn('Failed to fetch posts', error);
    } finally {
      setLoading(false);
    }
  };

  // get all posts on screen focus
  useEffect(() => {
    getAllPosts();
  }, []);

  // get safe area insets
  const insets = useSafeAreaInsets();

  // navigate to create post screen
  const navigateToCreatePost = () => {
    navigation.jumpTo(AppScreens.ADD_POST);
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
      <View style={[tw`flex-1 bg-gray-100`, { paddingTop: insets.top }]}>
        <Header />
        <FlatList
          data={allPosts}
          renderItem={({ item }) => <FeedPostItem post={item} onPress={handleZoomImage} />}
          keyExtractor={(item, index) => index.toString()}
          style={tw`flex-1 bg-gray-100`}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={Platform.OS === 'web'}
          onEndReached={() => allPosts.length > 0 && infoFlash('No more posts to show!')}
          ListEmptyComponent={() => !loading && <ListEmpty title='No posts to show' />}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={getAllPosts} />}
        />
        {/* <FAB onPress={navigateToCreatePost} icon={<Feather name='edit' size={22} color={COLORS.WHITE} />} /> */}
      </View>
      <PostDetailModal
        isVisible={showDetailsModal && !!selectedPost}
        onClose={handleCloseDetailsModal}
        selectedPost={selectedPost}
      />
    </Fragment>
  );
};

export default FeedScreen;
