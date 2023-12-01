import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ProfileScreenProps } from '@/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { UserImagePicker } from '@/components';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const name = 'John Doe';
  const email = 'johndoe@gmail.com';
  const imageUri = '';

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.infoContainer}>
        <UserImagePicker imageUri={imageUri} name={name} disabled containerStyle={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name='settings' size={24} color={COLORS.SECONDARY} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
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
