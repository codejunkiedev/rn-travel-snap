import { FlatList, StyleSheet, View } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { FeedScreenProps, IPost, IUser } from '@/interfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FAB, Header } from '@/components/ui';
import { AppScreens, PROFILE_SCREEN_DATA } from '@/constants';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@/typography';
import { FeedPostItem } from '@/components';
import { infoFlash } from '@/helpers/flash-message';
import { PostDetailModal } from '@/components/modals';
import { useModal } from '@/hooks';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/services';

const FeedScreen: React.FC<FeedScreenProps> = ({ navigation, route }) => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [showDetailsModal, openDetailsModal, closeDetailsModal] = useModal();
  const [allPosts,setAllPosts] = useState<IPost[]>([])
  const getAllPosts = async () =>{
    const posts:IPost[] = []
    try {
      const userDocRef = await getDocs(collection(FIRESTORE_DB, 'posts'));
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
    getAllPosts()
  },[])

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
          onEndReached={() => infoFlash('No more posts to show!')}
        />
        <FAB onPress={navigateToCreatePost} icon={<FontAwesome name='plus' size={24} color={COLORS.WHITE} />} />
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
