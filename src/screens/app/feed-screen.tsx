import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FeedScreenProps } from '@/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';

const FeedScreen: React.FC<FeedScreenProps> = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      <Text>FeedScreen</Text>
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
