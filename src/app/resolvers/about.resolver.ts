import { TransferState, inject, isDevMode, makeStateKey } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export type AboutDoc = {
  name: string;
  description: string;
};

export const aboutResolver: ResolveFn<AboutDoc> = async () => {

  const db = inject(Firestore);
  const state = inject(TransferState);

  const key = makeStateKey<AboutDoc>('about');

  const cache = state.get(key, null);
  if (cache) {
    return cache;    
  }

  const aboutSnap = await getDoc(
    doc(db, '/about/ZlNJrKd6LcATycPRmBPA')
  );

  if (!aboutSnap.exists()) {
    throw 'Document does not exist!';
  }

  const data = aboutSnap.data() as AboutDoc;

  state.set(key, data);

  if (isDevMode()) {
    console.log(data);
  }

  return data;
};
