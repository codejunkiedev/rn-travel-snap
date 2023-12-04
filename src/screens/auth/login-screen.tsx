import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LoginScreenProps, ILoginForm } from '@/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLoading } from '@/hooks';
import { IMAGES, AuthScreens, validationSchemaSignIn } from '@/constants';
import { COLORS } from '@/typography';
import { Button, LabeledInput } from '@/components/ui';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/redux/app-state.slice';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/services';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  const [loading, setLoading] = useLoading();

  const dispatch = useDispatch();

  const auth = FIREBASE_AUTH;

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchemaSignIn,
    onSubmit: (values) => handleLogin(values),
  });
  
  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      console.log("user ----> ",user)
    })
  },[])

  const handleLogin = async  ({email,password}: ILoginForm) => {
    try {
      setLoading(true);
      // console.log('payload', payload);
      // console.log(payload)
      const response = await signInWithEmailAndPassword(auth,email,password);
      // const response = c
      console.log("this is response -----> ",response)
      const userDocRef = await getDoc(doc(FIRESTORE_DB, "users", response.user.uid));
      const userData = userDocRef.data()
      // console.log("this is user ----> ",userDocRef.data())
      dispatch(updateUser({ email, name: userData?.name }));
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
