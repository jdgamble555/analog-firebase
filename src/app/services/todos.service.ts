import {
  InjectionToken,
  effect,
  inject,
  isDevMode,
  signal
} from '@angular/core';
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  Timestamp,
  Firestore
} from '@angular/fire/firestore';
import { USER } from './user.service';

export interface TodoItem {
  id: string;
  text: string;
  complete: boolean;
  created: Date;
  uid: string;
};

export const snapToData = (
  q: QuerySnapshot<DocumentData, DocumentData>
) => {

  // creates todo data from snapshot
  if (q.empty) {
    return [];
  }
  return q.docs.map((doc) => {
    const data = doc.data({
      serverTimestamps: 'estimate'
    });
    const created = data['created'] as Timestamp;
    return {
      ...data,
      created: created.toDate(),
      id: doc.id
    }
  }) as TodoItem[];
}

export const TODOS = new InjectionToken(
  'TODOS',
  {
    providedIn: 'root',
    factory() {
      const db = inject(Firestore);
      const user = inject(USER);

      const todos = signal<{
        data: TodoItem[],
        loading: boolean
      }>({
        data: [],
        loading: true
      });

      effect(() => {

        const userData = user().data;

        if (!userData) {
          todos.set({
            loading: false,
            data: []
          });
          return;
        }

        todos.update(_todos => ({
          ..._todos,
          loading: false
        }));

        return onSnapshot(

          // query realtime todo list
          query(
            collection(db, 'todos'),
            where('uid', '==', userData.uid),
            orderBy('created')
          ), (q) => {

            // get data, map to todo type
            const data = snapToData(q);

            /**
             * Note: Will get triggered 2x on add 
             * 1 - for optimistic update
             * 2 - update real date from server date
             */

            // print data in dev mode
            if (isDevMode()) {
              console.log(data);
            }

            // add to store
            todos.set({
              data,
              loading: false
            });
          });

      }, { allowSignalWrites: true });
      return todos;
    }
  }
);

export const ADD_TODO = new InjectionToken(
  'ADD_TODO',
  {
    providedIn: 'root',
    factory() {

      const user = inject(USER);
      const db = inject(Firestore)

      return (e: SubmitEvent) => {

        e.preventDefault();

        const userData = user().data;

        if (!userData) {
          throw 'No User!';
        }

        // get and reset form
        const target = e.target as HTMLFormElement;
        const form = new FormData(target);
        const { task } = Object.fromEntries(form);

        if (typeof task !== 'string') {
          return;
        }

        // reset form
        target.reset();

        addDoc(collection(db, 'todos'), {
          uid: userData.uid,
          text: task,
          complete: false,
          created: serverTimestamp()
        });
      };
    }
  }
);

export const UPDATE_TODO = new InjectionToken(
  'UPDATE_TODO',
  {
    providedIn: 'root',
    factory() {
      const db = inject(Firestore);
      return (id: string, complete: boolean) => {
        updateDoc(doc(db, 'todos', id), { complete });
      };
    }
  }
);

export const DELETE_TODO = new InjectionToken(
  'DELETE_TODO',
  {
    providedIn: 'root',
    factory() {
      const db = inject(Firestore);
      return (id: string) => {
        deleteDoc(doc(db, 'todos', id));
      };
    }
  }
);
