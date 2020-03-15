import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAtFwhTDBN7kfd3ikmgDD5Nhm2b2VUO7oI",
    authDomain: "crwn-db-9657d.firebaseapp.com",
    databaseURL: "https://crwn-db-9657d.firebaseio.com",
    projectId: "crwn-db-9657d",
    storageBucket: "crwn-db-9657d.appspot.com",
    messagingSenderId: "19362387032",
    appId: "1:19362387032:web:ad91fc78892b06d56a662d",
    measurementId: "G-WWVHQ7KD83"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
