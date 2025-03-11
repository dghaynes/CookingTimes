import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";
import { getFirestore } from "firebase/firestore"

/*const firebaseConfig = {
    apikey: import.meta.env.VITE_FB_API_KEY,
    projectId: import.meta.env.VITE_FB_PROJECT_ID,
    authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
    storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FB_APP_ID,
    measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID
};*/

const firebaseConfig = {
    apiKey: "AIzaSyC5_HtVsVynWRArpEG08pMlPZGbblQqtAA",
    authDomain: "cookingtimes-a3fe7.firebaseapp.com",
    projectId: "cookingtimes-a3fe7",
    storageBucket: "cookingtimes-a3fe7.firebasestorage.app",
    messagingSenderId: "427611912707",
    appId: "1:427611912707:web:e334436b978d0aa306ac36",
    measurementId: "G-TMCFH25S3S"
}

console.log(import.meta.env);

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {auth, provider, signInWithPopup, signOut, onAuthStateChanged, db};