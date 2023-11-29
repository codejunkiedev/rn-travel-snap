import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AuthScreenProps } from '@/interfaces/screens';

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation, route }) => {
  return (
    <View>
      <Text>AuthScreen</Text>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
