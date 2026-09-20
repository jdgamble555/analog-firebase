import type { PageServerLoad } from '@analogjs/router';
import { getApps, initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import type { AboutDoc } from '@components/about/about.model';

export const load = async (_context: PageServerLoad): Promise<AboutDoc> => {
  const firebaseConfig = JSON.parse(import.meta.env['VITE_FIREBASE_CONFIG']);
  const app = getApps().find((candidate) => candidate.name === '[DEFAULT]')
    ?? initializeApp(firebaseConfig);
  const snapshot = await getDoc(doc(getFirestore(app), 'about', 'ZlNJrKd6LcATycPRmBPA'));

  if (!snapshot.exists()) {
    throw new Error('About document does not exist');
  }

  return snapshot.data() as AboutDoc;
};
