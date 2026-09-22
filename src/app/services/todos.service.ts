import {
  InjectionToken,
  effect,
  inject,
  isDevMode,
  signal,
  untracked
} from '@angular/core';
import {
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
  type FirestoreDataConverter
} from 'firebase/firestore';
import { USER } from './auth.service';
import { FirebaseError } from 'firebase/app';
import { db } from '../lib/firebase';

export const generateText = () =>
  doc(collection(db, 'todos')).id.substring(0, 10).toLowerCase();

const todoConverter: FirestoreDataConverter<TodoDoc> = {
  toFirestore(todo) {
    return todo;
  },
  fromFirestore(snapshot) {
    const data = snapshot.data({
      serverTimestamps: 'estimate'
    });
    const createdAt = data['createdAt'] as Timestamp;

    return {
      ...data,
      createdAt: createdAt.toDate(),
      id: snapshot.id
    } as TodoDoc;
  }
};

export const TODOS = new InjectionToken(
  'TODOS',
  {
    providedIn: 'root',
    factory() {
      const user = inject(USER);

      const todos = signal<{
        data: TodoDoc[],
        loading: boolean,
        error: FirebaseError | null
      }>({
        data: [],
        loading: true,
        error: null
      });

      effect((onCleanup) => {

        const userData = user().data;

        if (!userData) {
          untracked(() => {
            todos.set({
              loading: false,
              data: [],
              error: null
            });
          });
          return;
        }

        const unsubscribe = onSnapshot(

          // query realtime todo list
          query(
            collection(db, 'todos'),
            where('uid', '==', userData.uid),
            orderBy('createdAt')
          ).withConverter(todoConverter), (q) => {
            const data = q.docs.map((document) => document.data());

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
              loading: false,
              error: null
            });
          }, (error) => {

            // handle errors
            todos.set({
              loading: false,
              data: [],
              error
            });
            
          });

        onCleanup(unsubscribe);
      });

      return todos;
    }
  }
);

export async function addTodo(text: string, currentUser: UserType | null) {
  if (!currentUser) {
    return { error: 'No user' };
  }

  try {
    await addDoc(collection(db, 'todos'), {
      uid: currentUser.uid,
      text,
      complete: false,
      createdAt: serverTimestamp()
    });
    return { error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function updateTodo(id: string, complete: boolean) {
  try {
    await updateDoc(doc(db, 'todos', id), { complete, updatedAt: serverTimestamp() });
    return { error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function deleteTodo(id: string) {
  try {
    await deleteDoc(doc(db, 'todos', id));
    return { error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error: error.message };
    }
    throw error;
  }
}
