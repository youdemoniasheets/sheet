import firebaseConfig from "@/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/database"; // Add the specific Firebase services you need



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
