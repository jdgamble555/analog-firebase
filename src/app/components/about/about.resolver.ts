import { inject, isDevMode } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { useAsyncTransferState } from '@lib/utils';

export type AboutDoc = {
  name: string;
  description: string;
};

export const aboutResolver: ResolveFn<AboutDoc> = async () =>
  
  useAsyncTransferState('about', async () => {

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

