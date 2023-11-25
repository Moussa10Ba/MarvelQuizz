import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {getFirestore, doc} from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBnn1h85F93DQetSCG8etyjBv-RI41G2bs",
    authDomain: "marvelquiz-e2e5d.firebaseapp.com",
    projectId: "marvelquiz-e2e5d",
    storageBucket: "marvelquiz-e2e5d.appspot.com",
    messagingSenderId: "902516467684",
    appId: "1:902516467684:web:25bec7b2eb81e8e40809f1"
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const  user = (uid) =>  doc(firestore,`users/${uid}`);


  
