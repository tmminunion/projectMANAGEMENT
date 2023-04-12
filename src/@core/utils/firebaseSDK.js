// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  databaseURL: process.env.NEXT_PUBLIC_databaseURL,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId
}

// Initialize Firebase
const FirebaseSDK = initializeApp(firebaseConfig)

const Fireauth = getAuth(FirebaseSDK)
const fireuser = process.env.NEXT_PUBLIC_USERFIRE

signInWithEmailAndPassword(Fireauth, fireuser, fireuser)
  .then(userCredential => {
    const user = userCredential.user
  })
  .catch(error => {
    const errorCode = error.code
    const errorMessage = error.message
  })

export const FIREDBdb = getFirestore(FirebaseSDK)
