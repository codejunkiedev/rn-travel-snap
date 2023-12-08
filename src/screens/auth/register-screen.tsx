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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { successFlash, warningFlash } from '@/helpers/flash-message';
import tw from 'twrnc';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation, route }) => {
  const { email, password } = route.params;

  const [profilePicture, setProfilePicture] = useState<string>('');
  const [loading, setLoading] = useLoading();

  // formik hook for form handling
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

  // navigate to login screen and pass email and password as params
  const navigateToLogin = () => {
    navigation.navigate(AuthScreens.LOGIN, {
      email: formik.values.email,
      password: formik.values.password,
    });
  };

  // sign up with email and password using firebase auth
  const handleSignUp = async ({ email, password, name }: ISignUpForm) => {
    try {
      setLoading(true);

      const { user } = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      if (profilePicture) {
        const fileRef = ref(FIREBASE_STORAGE, `profilePictures/${user?.uid}`);
        // console.log(imageBase64)
        const blob: Blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function () {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', profilePicture, true);
          xhr.send(null);
        });

        var mimeString = profilePicture.split(',')[0].split(':')[1].split(';')[0];
        await uploadBytes(fileRef, blob, { contentType: mimeString });
        // console.log('upload after');
        const downloadUrlRes = await getDownloadURL(fileRef);
        const userDoc = {
          uid: user.uid,
          email,
          name,
          profilePicURL: downloadUrlRes,
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(FIRESTORE_DB, 'users', user.uid), userDoc);
      } else {
        const userDoc = {
          uid: user.uid,
          email,
          name,
          profilePicURL: profilePicture,
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(FIRESTORE_DB, 'users', user.uid), userDoc);
      }
      successFlash('SignUp successful');
      navigateToLogin();
    } catch (error: any) {
      console.warn('SignUp', error.message ?? 'Something went wrong');
      warningFlash('SignUp failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={tw`flex-1`} contentContainerStyle={tw`flex-grow pb-6 pt-10`}>
          <UserImagePicker
            name={formik.values.name}
            imageUri={profilePicture}
            onImageSelected={(uri) => setProfilePicture(uri)}
            containerStyle={tw`mb-4`}
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
          <Button title='Back to Login' mode='outlined' onPress={navigateToLogin} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingTop: 100,
  },
});
