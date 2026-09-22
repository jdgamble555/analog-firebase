import {
  DestroyRef,
  InjectionToken,
  inject,
  isDevMode,
  signal
} from '@angular/core';
import {
  GoogleAuthProvider,
  User,
  onIdTokenChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../lib/firebase';

export const USER = new InjectionToken(
  'user',
  {
    providedIn: 'root',
    factory() {

      const destroy = inject(DestroyRef);

      const user = signal<{
        loading: boolean,
        data: UserType | null,
        error: Error | null
      }>({
        loading: true,
        data: null,
        error: null
      });

      // toggle loading
      user.update(_user => ({
        ..._user,
        loading: true
      }));

      const unsubscribe = onIdTokenChanged(auth,
        (_user: User | null) => {

          if (!_user) {
            user.set({
              data: null,
              loading: false,
              error: null
            });
            return;
          }

          // map data to user data type
          const {
            photoURL,
            uid,
            displayName,
            email
          } = _user;
          const data = {
            photoURL,
            uid,
            displayName,
            email
          };

          // print data in dev mode
          if (isDevMode()) {
            console.log(data);
          }

          // set store
          user.set({
            data,
            loading: false,
            error: null
          });
        }, (error) => {

          // handle error
          user.set({
            data: null,
            loading: false,
            error
          });

        });

      destroy.onDestroy(unsubscribe);

      return user;
    }
  }
);

export async function login() {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    return { error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error: error.message };
    }
    throw error;
  }
}

