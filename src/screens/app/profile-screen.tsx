import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ProfileScreenProps } from '@/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
