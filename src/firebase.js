import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCHzvTd0FP_15gnBj5J3Da4oIhykTABiDw",
  authDomain: "souqoqaz.firebaseapp.com",
  databaseURL: "https://souqoqaz-default-rtdb.firebaseio.com",
  projectId: "souqoqaz",
  storageBucket: "souqoqaz.appspot.com",
  messagingSenderId: "511612392313",
  appId: "1:511612392313:web:80c31c742c8e0a2525d5a8",
  measurementId: "G-FNVYJZTWWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };