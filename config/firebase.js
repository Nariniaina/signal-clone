import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAVvxN8ZKtJuP5RrxSvOsr4FMNj5nW2eGk",
    authDomain: "signal-clone-b190f.firebaseapp.com",
    projectId: "signal-clone-b190f",
    storageBucket: "signal-clone-b190f.appspot.com",
    messagingSenderId: "785481819098",
    appId: "1:785481819098:web:4749f6f4dcd30c51f816e3"
};

let app;

// if we initialize the App
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };