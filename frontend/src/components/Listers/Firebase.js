// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCulj5eOmfqjKabG78RWua-TEd0IW6aMc",
  authDomain: "ti-parkeasy.firebaseapp.com",
  projectId: "ti-parkeasy",
  storageBucket: "ti-parkeasy.appspot.com",
  messagingSenderId: "727400954634",
  appId: "1:727400954634:web:fd451ca4ffab54d81598f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const db = getFirestore(app);
export { storage };
