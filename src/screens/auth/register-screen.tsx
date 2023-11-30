import { KeyboardAvoidingView, ScrollView, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { ISignUpForm, RegisterScreenProps } from '@/interfaces';
import { COLORS } from '@/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthScreens } from '@/constants';
import { useLoading } from '@/hooks';
import { Button, LabeledInput } from '@/components/ui';
import { UserImagePicker } from '@/components';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation, route }) => {
  const { email, password } = route.params;

  const [record, setRecord] = useState<ISignUpForm>({
    email: email,
    password: password,
    confirmPassword: '',
    name: '',
    profilePicture: '',
  });

  const [loading, setLoading] = useLoading();

  const onChange = (key: keyof ISignUpForm, value: ISignUpForm[keyof ISignUpForm]) => {
    setRecord((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignUp = () => {
    setLoading(true);
    navigation.navigate(AuthScreens.LOGIN);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.root} contentContainerStyle={styles.scrollContent}>
          <UserImagePicker
            name={record.name}
            imageUri={record.profilePicture}
            onImageSelected={(uri) => onChange('profilePicture', uri)}
          />
          <LabeledInput
            label='Name'
            placeholder='John Doe'
            value={record.name}
            onChangeText={(val) => onChange('name', val)}
          />
          <LabeledInput
            label='Email'
            placeholder='johndoe@gmail.com'
            value={record.email}
            keyboardType='email-address'
            onChangeText={(val) => onChange('email', val)}
          />
          <LabeledInput
            label='Password'
            placeholder=''
            value={record.password}
            onChangeText={(val) => onChange('password', val)}
            secureTextEntry
          />
          <LabeledInput
            label='Confirm Password'
            placeholder=''
            value={record.confirmPassword}
            onChangeText={(val) => onChange('confirmPassword', val)}
            secureTextEntry
          />
          <Button title='Sign Up' isLoading={loading} onPress={handleSignUp} buttonStyle={{ marginTop: 10 }} />
          <Button title='Back to Login' mode='outlined' isLoading={loading} onPress={handleSignUp} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingTop: 100,
  },
  logo: {
    height: 120,
    width: 120,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
