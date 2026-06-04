// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: 'authexamnotes-cad95.firebaseapp.com',
  projectId: 'authexamnotes-cad95',
  storageBucket: 'authexamnotes-cad95.firebasestorage.app',
  messagingSenderId: '432175882993',
  appId: '1:432175882993:web:313410d1eff3033fabbf50',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
