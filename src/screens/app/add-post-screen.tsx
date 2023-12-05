import { ScrollView, StyleSheet, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { AddPostScreenProps, IPost } from '@/interfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/typography';
import { Button, LabeledInput } from '@/components/ui';
import { useLoading, useModal } from '@/hooks';
import { warningFlash } from '@/helpers/flash-message';
import { AlertModal } from '@/components/modals';
import { useAppSelector } from '@/redux';
import { ImagePicker } from '@/components';

const AddPostScreen: React.FC<AddPostScreenProps> = ({ navigation, route }) => {
  const [content, setContent] = useState<string>('');
  const [imageUri, setImageUri] = useState<string>('');

  const [loading, setLoading] = useLoading();
  const [showModal, openModal, closeModal] = useModal();
  const insets = useSafeAreaInsets();

  const user = useAppSelector((state) => state.appState.user);

  const handlePost = async () => {
    try {
      setLoading(true);
      const payload: IPost = {
        content,
        imageURL: imageUri,
        user: {
          name: user?.name!,
          profilePicURL: user?.profilePicURL!,
          email: user?.email!,
        },
      };
    } catch (error) {
      console.warn('handlePost error', error);
      warningFlash('An error occurred while posting');
    } finally {
      setLoading(false);
    }
  };

  const handleClearInputs = () => {
    setContent('');
    setImageUri('');
    closeModal();
  };

  const handleDiscardChanges = () => {
    if (content || imageUri) {
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
            value={content}
            multiline
            numberOfLines={3}
            maxLength={250}
            autoCapitalize={'sentences'}
            editable={!loading}
            onChangeText={(text) => setContent(text)}
            showTextCounter
          />
          <Button title='Create Post' onPress={handlePost} isLoading={loading} buttonStyle={{ marginTop: 10 }} />
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
