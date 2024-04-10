import { TransferState, inject, isDevMode, makeStateKey } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export type AboutDoc = {
  name: string;
  description: string;
};

export const useAsyncTransferState = async <T>(
  name: string,
  fn: () => T
) => {
  const state = inject(TransferState);
  const key = makeStateKey<T>(name);
  const cache = state.get(key, null);
  if (cache) {
    return cache;
  }
  const data = await fn() as T;
  state.set(key, data);
  return data;
};

export const aboutResolver: ResolveFn<AboutDoc> = async () => {

  return await useAsyncTransferState('about', async () => {

    const db = inject(Firestore);

    const aboutSnap = await getDoc(
      doc(db, '/about/ZlNJrKd6LcATycPRmBPA')
    );

    if (!aboutSnap.exists()) {
      throw 'Document does not exist!';
    }

    const data = aboutSnap.data() as AboutDoc;

    if (isDevMode()) {
      console.log(data);
    }

    return data;

  });

};
