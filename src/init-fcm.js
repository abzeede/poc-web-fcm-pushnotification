import firebase from "firebase/app";
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
});

const messaging = initializedFirebaseApp.messaging();

export { messaging };
