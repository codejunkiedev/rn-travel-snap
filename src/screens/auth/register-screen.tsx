import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RegisterScreenProps } from '@/interfaces/screens';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation, route }) => {
  return (
    <View>
      <Text>RegisterScreen</Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
