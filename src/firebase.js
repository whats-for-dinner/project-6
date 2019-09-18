import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_idoH9ePbYSxRm1wO2tP9FxWnnqJvGac",
    authDomain: "whats-for-dinner-2.firebaseapp.com",
    databaseURL: "https://whats-for-dinner-2.firebaseio.com",
    projectId: "whats-for-dinner-2",
    storageBucket: "",
    messagingSenderId: "591704015009",
    appId: "1:591704015009:web:63e12ead190dbdc476b0e0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
