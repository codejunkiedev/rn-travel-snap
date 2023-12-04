import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './auth-stack';
import AppTabs from './app-tabs';
import { useAppSelector } from '@/redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '@/services';
import { doc, getDoc } from 'firebase/firestore';
import { useAppDispatch } from '@/redux';
import { removeUser, updateUser } from '@/redux/app-state.slice';
import { warningFlash } from '@/helpers/flash-message';
import { IUser } from '@/interfaces';

const AppNavigation = () => {
  const isLoggedIn = useAppSelector((state) => state.appState.isLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user?.uid) {
        const userDocRef = await getDoc(doc(FIRESTORE_DB, 'users', user?.uid));
        const userData = userDocRef.data() as IUser;
        dispatch(updateUser(userData));
      } else {
        warningFlash('Please login to continue');
        dispatch(removeUser());
      }
    });

    return () => unSub();
  }, []);

  return <NavigationContainer>{isLoggedIn ? <AppTabs /> : <AuthStack />}</NavigationContainer>;
};

export default AppNavigation;
