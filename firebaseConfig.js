// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-We4GHtHT30l2WODKR3tgyjh0J9KJlBg",
  authDomain: "authapp-5d014.firebaseapp.com",
  projectId: "authapp-5d014",
  storageBucket: "authapp-5d014.appspot.com",
  messagingSenderId: "825363954830",
  appId: "1:825363954830:web:933e82ded0c590d79b1ddf",
  measurementId: "G-S90C0Q8RNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Get a list of cities from your database
async function getCities() {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

// Initialize Firebase Authentication and get a reference to the service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth, db, getCities }; // Export for access from other files
