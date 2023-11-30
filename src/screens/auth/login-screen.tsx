import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { LoginScreenProps, ILoginForm } from '@/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLoading } from '@/hooks';
import { IMAGES, AuthScreens, validationSchemaSignIn } from '@/constants';
import { COLORS } from '@/typography';
import { Button, LabeledInput } from '@/components/ui';
import { useFormik } from 'formik';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  const [loading, setLoading] = useLoading();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchemaSignIn,
    onSubmit: (values) => handleLogin(values),
  });

  const handleLogin = (payload: ILoginForm) => {
    try {
      setLoading(true);
      console.log('payload', payload);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate(AuthScreens.REGISTER, {
      email: formik.values.email,
      password: formik.values.password,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <Image source={IMAGES.LOGO} style={styles.logo} />
      <LabeledInput
        label='Email'
        placeholder='johndoe@gmail.com'
        value={formik.values.email}
        keyboardType='email-address'
        autoCapitalize='none'
        onChangeText={formik.handleChange('email')}
        error={formik.errors.email}
        touched={formik.touched.email}
      />
      <LabeledInput
        label='Password'
        placeholder=''
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        error={formik.errors.password}
        touched={formik.touched.password}
        secureTextEntry
      />
      <Button title='Login' isLoading={loading} onPress={formik.handleSubmit} buttonStyle={{ marginTop: 10 }} />
      <Button
        title='Sign Up'
        mode='outlined'
        onPress={navigateToSignUp}
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
