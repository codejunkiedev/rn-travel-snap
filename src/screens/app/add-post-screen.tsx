import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AddPostScreenProps } from '@/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddPostScreen: React.FC<AddPostScreenProps> = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      <Text>AddPostScreen</Text>
    </SafeAreaView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({});
