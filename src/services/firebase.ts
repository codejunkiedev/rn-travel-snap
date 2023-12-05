import { FirebaseOptions, initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyCe8qCCE1XFmcRyLPoF7A0v_5K-423K2xU',
  authDomain: 'travelsnap-3cf5e.firebaseapp.com',
  projectId: 'travelsnap-3cf5e',
  storageBucket: 'travelsnap-3cf5e.appspot.com',
  messagingSenderId: '10514973032',
  appId: '1:10514973032:web:d2468e56cdd89a30b196dd',
  measurementId: 'G-JYC223KLJ6',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

// const analytics = getAnalytics(FIREBASE_APP);
