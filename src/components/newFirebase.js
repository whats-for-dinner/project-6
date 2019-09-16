import firebase from 'firebase/app';
import 'firebase/database';


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDRTyToY3ghj3Xzpp7wOPpnqrHGjBXg-k8",
    authDomain: "dinnertesting.firebaseapp.com",
    databaseURL: "https://dinnertesting.firebaseio.com",
    projectId: "dinnertesting",
    storageBucket: "dinnertesting.appspot.com",
    messagingSenderId: "629267453212",
    appId: "1:629267453212:web:ca1315d745388c7a5296d9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default newFirebase