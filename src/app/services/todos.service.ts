import { Injectable, effect, inject, isDevMode, signal } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  getFirestore,
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
  Timestamp
} from '@angular/fire/firestore';
import { UserService } from './user.service';

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

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  db = getFirestore();
  user = inject(UserService).user$;

  todos = signal<{
    data: TodoItem[],
    loading: boolean
  }>({
    data: [],
    loading: true
  });

  constructor() {

    effect(() => {

      const userData = this.user().data;

      if (!userData) {
        this.todos().loading = false;
        this.todos().data = [];
        return;
      }

      return onSnapshot(

        // query realtime todo list
        query(
          collection(this.db, 'todos') as CollectionReference<TodoItem[]>,
          where('uid', '==', userData.uid),
          orderBy('created')
        ), (q) => {

          // toggle loading
          this.todos().loading = false;

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
          this.todos().data = data;
        });

    });
  }

  addTodo = (e: SubmitEvent, uid?: string) => {

    e.preventDefault();

    if (!uid) {
      throw 'No UID!';
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

    addDoc(collection(this.db, 'todos'), {
      uid,
      text: task,
      complete: false,
      created: serverTimestamp()
    });
  }

  updateTodo = (id: string, complete: boolean) => {
    updateDoc(doc(this.db, 'todos', id), { complete });
  }

  deleteTodo = (id: string) => {
    deleteDoc(doc(this.db, 'todos', id));
  }

}
