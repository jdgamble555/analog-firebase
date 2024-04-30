import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  InjectionToken,
  PLATFORM_ID,
  inject,
  isDevMode,
  signal
} from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  onIdTokenChanged,
  signInWithPopup,
  signOut
} from '@angular/fire/auth';

export interface userData {
  photoURL: string | null;
  uid: string;
  displayName: string | null;
  email: string | null;
};

export const FIREBASE_AUTH = new InjectionToken<Auth | null>(
  'firebase-auth',
  {
    providedIn: 'root',
    factory() {
      const platformID = inject(PLATFORM_ID);
      if (isPlatformBrowser(platformID)) {
        return inject(Auth);
      }
      return null;
    }
  }
);

export const USER = new InjectionToken(
  'user',
  {
    providedIn: 'root',
    factory() {

      const auth = inject(FIREBASE_AUTH);
      const destroy = inject(DestroyRef);

      const user = signal<{
        loading: boolean,
        data: userData | null,
        error: Error | null
      }>({
        loading: true,
        data: null,
        error: null
      });

      // server environment
      if (!auth) {
        user.set({
          data: null,
          loading: false,
          error: null
        });
        return user;
      }

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

export const LOGIN = new InjectionToken(
  'LOGIN',
  {
    providedIn: 'root',
    factory() {
      const auth = inject(FIREBASE_AUTH);
      return () => {
        if (auth) {
          signInWithPopup(
            auth,
            new GoogleAuthProvider()
          );
          return;
        }
        throw 'No USER!';
      };
    }
  }
);

export const LOGOUT = new InjectionToken(
  'LOGOUT',
  {
    providedIn: 'root',
    factory() {
      const auth = inject(FIREBASE_AUTH);
      return () => {
        if (auth) {
          signOut(auth);
          return;
        }
        throw 'No USER!';
      };
    }
  }
);

