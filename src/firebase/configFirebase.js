// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAcn1a3DjNLJNHwUbuFcBDri5-WqEtBpcI',
    authDomain: 'bookingcare-6a74c.firebaseapp.com',
    projectId: 'bookingcare-6a74c',
    storageBucket: 'bookingcare-6a74c.appspot.com',
    messagingSenderId: '932898808657',
    appId: '1:932898808657:web:4a048f799273e2a18ae970',
    measurementId: 'G-VRTHPLG46M',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
