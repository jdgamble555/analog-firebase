import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebase_config = JSON.parse(__FIREBASE_CONFIG__);


export const app = getApps().length
    ? getApp()
    : initializeApp(firebase_config);

export const auth = getAuth(app);
export const db = getFirestore(app);