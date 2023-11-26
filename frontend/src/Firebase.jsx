import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_firebase_apiKey,
  authDomain: "incubatoros.firebaseapp.com",
  projectId: "incubatoros",
  storageBucket: "incubatoros.appspot.com",
  messagingSenderId: import.meta.env.VITE_REACT_APP_messagingSenderId,
  appId: import.meta.env.VITE_REACT_APP_appId,
  measurementId: import.meta.env.VITE_REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    return signInWithPopup(auth, provider);
  } catch (error) {
    return err;
  }
};

// deleteUser(user).then(() => {
//   // User deleted.
// }).catch((error) => {
//   // An error ocurred
//   // ...
// });
