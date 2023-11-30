import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { LoginScreenProps, ILoginForm } from '@/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLoading } from '@/hooks';
import { IMAGES, AuthScreens } from '@/constants';
import { COLORS } from '@/typography';
import { Button, LabeledInput } from '@/components/ui';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  const [record, setRecord] = useState<ILoginForm>({ email: '', password: '' });
  const [loading, setLoading] = useLoading();

  const onChangeText = (key: keyof ILoginForm, value: ILoginForm[keyof ILoginForm]) => {
    setRecord((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = () => {
    try {
      setLoading(true);
      // console.log('record', record);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate(AuthScreens.REGISTER, {
      email: record.email,
      password: record.password,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <Image source={IMAGES.LOGO} style={styles.logo} />
      <LabeledInput
        label='Email'
        placeholder='johndoe@gmail.com'
        value={record.email}
        keyboardType='email-address'
        onChangeText={(val) => onChangeText('email', val)}
      />
      <LabeledInput
        label='Password'
        placeholder=''
        value={record.password}
        onChangeText={(val) => onChangeText('password', val)}
      />
      <Button title='Login' isLoading={loading} onPress={handleLogin} buttonStyle={{ marginTop: 10 }} />
      <Button
        title='Sign Up'
        mode='outlined'
        onPress={handleSignUp}
        textStyle={{ color: COLORS.PRIMARY }}
        buttonStyle={{ marginTop: 5 }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: COLORS.BACKGROUND,
  },
  logo: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
