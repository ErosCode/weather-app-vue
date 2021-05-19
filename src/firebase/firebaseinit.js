import firebase from "firebase/app";
import "firebase/firestore";


  var firebaseConfig = {
    apiKey: "AIzaSyDuuAgDVpreAo-QS6T7XuGeGgHgeJrRjTo",
    authDomain: "weatherappvue-86c0b.firebaseapp.com",
    projectId: "weatherappvue-86c0b",
    storageBucket: "weatherappvue-86c0b.appspot.com",
    messagingSenderId: "438758780686",
    appId: "1:438758780686:web:e247316b1524c72584f15f"
  };

  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore();
