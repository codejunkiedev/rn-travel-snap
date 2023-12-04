import { KeyboardAvoidingView, ScrollView, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { ISignUpForm, RegisterScreenProps } from '@/interfaces';
import { COLORS } from '@/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthScreens, validationSchemaSignUp } from '@/constants';
import { useLoading } from '@/hooks';
import { Button, LabeledInput } from '@/components/ui';
import { UserImagePicker } from '@/components';
import { useFormik } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/services';
import { FIREBASE_STORAGE } from '@/services';
import {ref,uploadBytes,getDownloadURL, getBlob, uploadString,} from "firebase/storage"
import { doc, setDoc } from 'firebase/firestore';
const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation, route }) => {
  const { email, password } = route.params;

  const [profilePicture, setProfilePicture] = useState<string>('');
  const [loading, setLoading] = useLoading();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: email,
      password: password,
      confirmPassword: '',
    },
    validationSchema: validationSchemaSignUp,
    onSubmit: (values) => handleSignUp(values),
  });

  const navigateToLogin = () => {
    navigation.navigate(AuthScreens.LOGIN);
  };

  const handleSignUp = async ({email,password,name}: ISignUpForm) => {
   try {
    setLoading(true);
   
    const {user}  = await createUserWithEmailAndPassword(FIREBASE_AUTH,email,password)
    const fileRef = ref(FIREBASE_STORAGE,`profilePictures/${user?.uid}`)
    await uploadString(fileRef,profilePicture,"data_url")
    const downloadUrlRes = await getDownloadURL(fileRef)
    const userDoc = {
      uid: user.uid,
      email,
      name,
      profilePicURL: downloadUrlRes,
      posts: [],
      createdAt: Date.now(),
    };
    await setDoc(doc(FIRESTORE_DB, "users", user.uid), userDoc);

    navigateToLogin();
    setLoading(false);
   } catch (error) {
    console.log(error)
   }finally{
    setLoading(false)
   }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.root} contentContainerStyle={styles.scrollContent}>
          <UserImagePicker
            name={formik.values.name}
            imageUri={profilePicture}
            onImageSelected={(uri) => setProfilePicture(uri)}
            containerStyle={{ marginBottom: 20 }}
          />
          <LabeledInput
            label='Name'
            placeholder='John Doe'
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            error={formik.errors.name}
            touched={formik.touched.name}
          />
          <LabeledInput
            label='Email'
            placeholder='johndoe@gmail.com'
            value={formik.values.email}
            keyboardType='email-address'
            textContentType='emailAddress'
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
            secureTextEntry
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          <LabeledInput
            label='Confirm Password'
            placeholder=''
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            secureTextEntry
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
          />
          <Button title='Sign Up' isLoading={loading} onPress={formik.handleSubmit} buttonStyle={{ marginTop: 10 }} />
          <Button title='Back to Login' mode='outlined' isLoading={loading} onPress={navigateToLogin} />
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
