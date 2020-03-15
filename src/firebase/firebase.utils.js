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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (e) {
            console.log('error creating user', e.message);
        }

    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
