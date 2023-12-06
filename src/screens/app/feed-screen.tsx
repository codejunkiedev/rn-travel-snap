import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { FeedScreenProps, IPost, IUser } from '@/interfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FAB, Header } from '@/components/ui';
import { AppScreens, PROFILE_SCREEN_DATA } from '@/constants';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/typography';
import { FeedPostItem } from '@/components';
import { infoFlash, warningFlash } from '@/helpers/flash-message';
import { PostDetailModal } from '@/components/modals';
import { useLoading, useModal } from '@/hooks';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/services';
import { useFocusEffect } from '@react-navigation/native';
import { ListEmpty } from '@/components/ui/list-empty';

const FeedScreen: React.FC<FeedScreenProps> = ({ navigation, route }) => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);

  const [loading, setLoading] = useLoading();
  const [showDetailsModal, openDetailsModal, closeDetailsModal] = useModal();

  const getAllPosts = async () => {
    const posts: IPost[] = [];
    try {
      setLoading(true);
      const userDocRef = await getDocs(collection(FIRESTORE_DB, 'posts'));
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

  useFocusEffect(
    React.useCallback(() => {
      getAllPosts();
      return () => {
        setAllPosts([]);
      };
    }, [])
  );

  const insets = useSafeAreaInsets();

  const navigateToCreatePost = () => {
    navigation.jumpTo(AppScreens.ADD_POST);
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
        <Header />
        <FlatList
          data={allPosts}
          renderItem={({ item }) => <FeedPostItem post={item} onPress={handleZoomImage} />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.feed}
          contentContainerStyle={styles.feedContentContainer}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          onEndReached={() => allPosts.length > 0 && infoFlash('No more posts to show!')}
          ListEmptyComponent={() => !loading && <ListEmpty title='No posts to show' />}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={getAllPosts} />}
        />
        <FAB onPress={navigateToCreatePost} icon={<Feather name='edit' size={22} color={COLORS.WHITE} />} />
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  feed: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  feedContentContainer: {
    gap: 10,
    padding: 10,
  },
});
