import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfnLUSNBZGj6ENYLSwpqyMdp4YJ8zDUvw",
    authDomain: "whats-for-dinner-a216e.firebaseapp.com",
    databaseURL: "https://whats-for-dinner-a216e.firebaseio.com",
    projectId: "whats-for-dinner-a216e",
    storageBucket: "",
    messagingSenderId: "113268541767",
    appId: "1:113268541767:web:6abfd7cd097beed865e462"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
