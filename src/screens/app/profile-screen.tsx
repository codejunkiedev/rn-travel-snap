import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { ProfileScreenProps } from '@/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { UserImagePicker } from '@/components';
import { Ionicons } from '@expo/vector-icons';
import { AlertModal } from '@/components/modals';
import { useDispatch } from 'react-redux';
import { removeUser } from '@/redux/app-state.slice';
import { useModal } from '@/hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/services';
import { getDoc, doc } from 'firebase/firestore';

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [imageUri,setImageUri] = useState("");

  const [showModal, openModal, closeModal] = useModal();

  const dispatch = useDispatch();
  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,async (user)=>{
      if(user?.uid){
        const userDocRef = await getDoc(doc(FIRESTORE_DB, "users", user?.uid));
      const userData = userDocRef.data()
      console.log(userData)
      setName(userData?.name)
      setEmail(userData?.email)
      setImageUri(userData?.profilePicURL)
      }
    })
  },[])

  const handleLogout = () => {
    closeModal();
    dispatch(removeUser());
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.root}>
        <View style={styles.infoContainer}>
          <UserImagePicker imageUri={imageUri} name={name} disabled containerStyle={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
          <TouchableOpacity onPress={openModal}>
            <Ionicons name='settings' size={24} color={COLORS.SECONDARY} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <AlertModal
        animationType='slide'
        isVisible={showModal}
        onClose={closeModal}
        title='Logout'
        message='Are you sure you want to logout?'
        buttons={[
          { text: 'No', onPress: closeModal },
          { text: 'Yes', onPress: handleLogout, style: 'destructive' },
        ]}
      />
    </Fragment>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  email: {
    fontSize: FONT_SIZE.SMALL,
  },
  name: {
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    fontSize: FONT_SIZE.MEDIUM,
  },
});
