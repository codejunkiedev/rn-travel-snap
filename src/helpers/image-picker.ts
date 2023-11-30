import * as ImagePicker from 'expo-image-picker';

export const getPermissionForLibrary = async (): Promise<boolean> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      return true;
    }
    return false;
  } catch (e) {
    console.warn('Error while getting permission', e);
    return false;
  }
};

export const getPermissionForCamera = async (): Promise<boolean> => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      return true;
    }
    return false;
  } catch (e) {
    console.warn('Error while getting permission', e);
    return false;
  }
};

export const pickImageFromLibrary = async (): Promise<string | null> => {
  const isPermissionGranted = await getPermissionForLibrary();
  if (!isPermissionGranted) {
    return null;
  }

  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      return result.assets[0].uri;
    }
    return null;
  } catch (e) {
    console.warn('Error while picking image from library', e);
    return null;
  }
};

export const pickImageFromCamera = async (): Promise<string | null> => {
  const isPermissionGranted = await getPermissionForCamera();
  if (!isPermissionGranted) {
    return null;
  }

  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      return result.assets[0].uri;
    }
    return null;
  } catch (e) {
    console.warn('Error while picking image from camera', e);
    return null;
  }
};
