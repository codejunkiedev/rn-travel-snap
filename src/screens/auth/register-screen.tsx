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

  const handleSignUp = (payload: ISignUpForm) => {
    setLoading(true);
    console.log(payload);
    // navigateToLogin();
    setLoading(false);
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
