// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: 'AIzaSyAcn1a3DjNLJNHwUbuFcBDri5-WqEtBpcI',
    // authDomain: 'bookingcare-6a74c.firebaseapp.com',
    // projectId: 'bookingcare-6a74c',
    // storageBucket: 'bookingcare-6a74c.appspot.com',
    // messagingSenderId: '932898808657',
    // appId: '1:932898808657:web:4a048f799273e2a18ae970',
    // measurementId: 'G-VRTHPLG46M',
    apiKey: 'AIzaSyCkiby-W_Yxmx4gRr-fFBafN3M-lrk4Mig',
    authDomain: 'cloudbookingcare.firebaseapp.com',
    projectId: 'cloudbookingcare',
    storageBucket: 'cloudbookingcare.appspot.com',
    messagingSenderId: '180156615416',
    appId: '1:180156615416:web:395cec2fa6df1765c9890d',
    measurementId: 'G-1EJ1DX7BGF',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
