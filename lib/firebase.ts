import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD3jgqbNUIRz4XldcP5ghl8Cdk3_6v3QX0",
    authDomain: "cordly.firebaseapp.com",
    projectId: "cordly",
    storageBucket: "cordly.appspot.com",
    messagingSenderId: "1047809503652",
    appId: "1:1047809503652:web:04ddbb1fe63c39ac6a9131",
    measurementId: "G-0K993KBKQC"
  }

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()

export const firestore = firebase.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const fromMillis = firebase.firestore.Timestamp.fromMillis
export const increment = firebase.firestore.FieldValue.increment
export const arrayUnion = firebase.firestore.FieldValue.arrayUnion
