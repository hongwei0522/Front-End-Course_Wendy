import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCd6CrujsoDicdqlD15afqV9xgAF6Dl_Jw",
  authDomain: "front-enter-4cd25.firebaseapp.com",
  projectId: "front-enter-4cd25",
  storageBucket: "front-enter-4cd25.appspot.com",
  messagingSenderId: "104983472826",
  appId: "1:104983472826:web:3e0c68eed27925a3ecb083"
})

const auth = getAuth(firebaseApp);

// detect auth state 
onAuthStateChanged(auth, user => {
  if (user !== null) { 
    console.log('logged in!');
  } else {
    console.log('no user');
  }
});
