import * as ImagePicker from 'expo-image-picker';

// these functions are used to get permission for camera and library and then pick image from them

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
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
