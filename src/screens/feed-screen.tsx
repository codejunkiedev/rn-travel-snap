import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FeedScreenProps } from '@/interfaces/screens';

const FeedScreen: React.FC<FeedScreenProps> = ({ navigation, route }) => {
  return (
    <View style={styles.root}>
      <Text>FeedScreen</Text>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
