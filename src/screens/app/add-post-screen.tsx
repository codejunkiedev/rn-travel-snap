import { ScrollView, StyleSheet, View } from 'react-native';
import React, { Fragment, useMemo, useState } from 'react';
import { AddPostScreenProps, IAddPostForm, IPost } from '@/interfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/typography';
import { Button, LabeledInput } from '@/components/ui';
import { useLoading, useModal } from '@/hooks';
import { infoFlash, successFlash, warningFlash } from '@/helpers/flash-message';
import { AlertModal } from '@/components/modals';
import { useAppSelector } from '@/redux';
import { ImagePicker } from '@/components';
import { useFormik } from 'formik';
import { validationSchemaAddPost } from '@/constants';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_STORAGE, FIRESTORE_DB } from '@/services';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const AddPostScreen: React.FC<AddPostScreenProps> = ({ navigation, route }) => {
  const [imageUri, setImageUri] = useState<string>('');

  // formik hook for form handling
  const formik = useFormik({
    initialValues: { content: '' },
    validationSchema: validationSchemaAddPost,
    onSubmit: (values) => handlePost(values),
  });

  const [loading, setLoading] = useLoading();
  const [showModal, openModal, closeModal] = useModal();

  // get safe area insets
  const insets = useSafeAreaInsets();

  // check if form is filled
  const isFormFilled = useMemo(
    () => formik.values.content !== '' && imageUri !== '',
    [formik.values.content, imageUri]
  );

  // get user from redux
  const user = useAppSelector((state) => state.appState.user);

  // create post in firestore
  const handlePost = async (values: IAddPostForm) => {
    if (!isFormFilled) {
      infoFlash('Please fill all the fields', 'Image and Description are required');
      return;
    }

    try {
      setLoading(true);
      const payload: Partial<IPost> = {
        ...values,
        id: Date.now().toString(),
        imageURL: imageUri,
        userId: user?.uid,
        createdAt: Date.now(),
      };

      const fileRef = ref(FIREBASE_STORAGE, `posts/${user?.uid}/${payload.id}`);
      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imageUri, true);
        xhr.send(null);
      });

      var mimeString = imageUri.split(',')[0].split(':')[1].split(';')[0];
      await uploadBytes(fileRef, blob, { contentType: mimeString });
      const downloadUrlRes = await getDownloadURL(fileRef);
      payload.imageURL = downloadUrlRes;
      await setDoc(doc(FIRESTORE_DB, 'posts', payload.id!), payload);
      successFlash('Post created successfully');
      console.log('post created');
      handleClearInputs();
      navigation.goBack();
    } catch (error) {
      console.warn('handlePost error', error);
      warningFlash('An error occurred while posting');
    } finally {
      setLoading(false);
    }
  };

  // clear form inputs
  const handleClearInputs = () => {
    formik.resetForm();
    setImageUri('');
    closeModal();
  };

  // discard changes
  const handleDiscardChanges = () => {
    if (isFormFilled) {
      openModal();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Fragment>
      <ScrollView style={[styles.root, { marginTop: insets.top }]}>
        <View style={styles.container}>
          <ImagePicker imageUri={imageUri} onImageSelected={(uri) => setImageUri(uri)} />
          <LabeledInput
            label='Description'
            value={formik.values.content}
            multiline
            numberOfLines={3}
            maxLength={250}
            autoCapitalize={'sentences'}
            editable={!loading}
            onChangeText={formik.handleChange('content')}
            error={formik.errors.content}
            touched={formik.touched.content}
            showTextCounter
          />
          <Button
            title='Create Post'
            onPress={formik.handleSubmit}
            isLoading={loading}
            buttonStyle={{ marginTop: 10 }}
          />
          <Button title='Discard Changes' onPress={handleDiscardChanges} mode='outlined' />
        </View>
      </ScrollView>
      <AlertModal
        isVisible={showModal}
        onClose={closeModal}
        title='Discard Changes?'
        message='Are you sure you want to discard your changes?'
        buttons={[
          {
            text: 'Cancel',
            onPress: closeModal,
            style: 'cancel',
          },
          {
            text: 'Discard',
            onPress: handleClearInputs,
            style: 'destructive',
          },
        ]}
      />
    </Fragment>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  container: {
    flex: 1,
    paddingBottom: 20,
  },
});
