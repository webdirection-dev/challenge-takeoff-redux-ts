import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyBOfqPC1dL0BDVyneGxfnnzeFjNmikRKRE",
    authDomain: "takeoff-staff-3d3af.firebaseapp.com",
    projectId: "takeoff-staff-3d3af",
    storageBucket: "takeoff-staff-3d3af.appspot.com",
    messagingSenderId: "347904013282",
    appId: "1:347904013282:web:8e688202ec743cf1387fbb"
};

const app = initializeApp(firebaseConfig);