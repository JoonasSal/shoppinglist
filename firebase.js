import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

//tänne firebase konffi







if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export { db };