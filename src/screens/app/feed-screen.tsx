import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FeedScreenProps } from '@/interfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FAB } from '@/components/ui';
import { AppScreens } from '@/constants';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@/typography';

const FeedScreen: React.FC<FeedScreenProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  const navigateToCreatePost = () => {
    navigation.jumpTo(AppScreens.ADD_POST);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Text>FeedScreen</Text>
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
});
