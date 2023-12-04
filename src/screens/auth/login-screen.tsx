import { StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import { LoginScreenProps, ILoginForm, IUser } from '@/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoading } from '@/hooks';
import { AuthScreens, validationSchemaSignIn } from '@/constants';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
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

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user ----> ', user);
    });
  }, []);

  const handleLogin = async ({ email, password }: ILoginForm) => {
    try {
      setLoading(true);
      // console.log('payload', payload);
      // console.log(payload)
      const response = await signInWithEmailAndPassword(auth, email, password);
      // const response = c
      console.log('this is response -----> ', response);
      const userDocRef = await getDoc(doc(FIRESTORE_DB, 'users', response.user.uid));
      const userData = userDocRef.data() as IUser;
      // console.log("this is user ----> ",userDocRef.data())
      dispatch(updateUser(userData));
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
      <Text style={styles.logo}>Travel Snap</Text>
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
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: FONT_SIZE.HEADER,
    fontFamily: FONT_FAMILY.POPPINS_BOLD_ITALIC,
    color: COLORS.PRIMARY,
    textDecorationColor: COLORS.SECONDARY,
    textDecorationLine: 'underline',
  },
});
