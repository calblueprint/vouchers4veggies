import { initializeApp } from 'firebase/app';
import "firebase/auth";
// import {getFirestore, collection, getDocs} from 'firebase/firestore';
// import Constants from 'expo-constants';
import { 
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET
 } from '@env';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    masurementId: FIREBASE_MEASUREMENT_ID
};


const fbApp = initializeApp(firebaseConfig);

export default fbApp;


//FIREBASE_API_KEY: "AIzaSyDcJtjATkbt3j8xWFl4bZCGjixQ-Twq4Go",
// FIREBASE_AUTH_DOMAIN: "vouchers4veggies-eeb16.firebaseapp.com",
// FIREBASE_PROJECT_ID: "vouchers4veggies-eeb16",
// FIREBASE_STORAGE_BUCKET: "vouchers4veggies-eeb16.appspot.com",
// FIREBASE_MESSAGING_SENDER_ID: "405408181772",
// FIREBASE_APP_ID: "1:405408181772:web:50a42f0ebba28adced4829",
// FIREBASE_MEASUREMENT_ID: "G-Y47RZLCHXN" #optional
