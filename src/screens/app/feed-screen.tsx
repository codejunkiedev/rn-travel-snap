import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { FeedScreenProps } from '@/interfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FAB, Header } from '@/components/ui';
import { AppScreens, PROFILE_SCREEN_DATA } from '@/constants';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@/typography';
import { FeedPostItem } from '@/components';
import { infoFlash } from '@/helpers/flash-message';

const FeedScreen: React.FC<FeedScreenProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  const navigateToCreatePost = () => {
    navigation.jumpTo(AppScreens.ADD_POST);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Header />
      <FlatList
        data={PROFILE_SCREEN_DATA}
        renderItem={({ item }) => <FeedPostItem post={item} />}
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
