import { initializeApp } from "firebase/app";


//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTYpqPswzYpqIlf-sfdLoDJroew3hPBCM",
    authDomain: "shulapp.firebaseapp.com",
    projectId: "shulapp",
    storageBucket: "shulapp.appspot.com",
    messagingSenderId: "329842802875",
    appId: "1:329842802875:web:77da65c4775da3d9f8a99e",
    measurementId: "G-9HFJLK9Y6X"
};

// Initialize Firebase
export const fireBase = initializeApp(firebaseConfig)
