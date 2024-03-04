import { Injectable, effect, inject, isDevMode, signal } from '@angular/core';
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


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = typeof window !== 'undefined' ? inject(Auth) : null;

  user$ = signal<{
    loading: boolean,
    data: userData | null
  }>({
    loading: true,
    data: null
  });

  constructor() {

    effect(() => {

      // toggle loading
      this.user$().loading = true;

      // server environment
      if (!this.auth) {
        this.user$().loading = false;
        this.user$().data = null;
        return;
      }

      return onIdTokenChanged(this.auth, (_user: User | null) => {

        this.user$().loading = false;

        if (!_user) {
          this.user$().data = null;
          return;
        }

        // map data to user data type
        const { photoURL, uid, displayName, email } = _user;
        const data = { photoURL, uid, displayName, email };

        // print data in dev mode
        if (isDevMode()) {
          console.log(data);
        }

        // set store
        this.user$().data = data;
      });

    });

  }

  login() {
    if (this.auth) {
      const signIn = typeof window !== 'undefined' ? signInWithPopup : null;
      if (signIn) {
        signIn(this.auth, new GoogleAuthProvider());
      }      
    }
  }

  logout() {
    if (this.auth) {
      signOut(this.auth);
    }  
  }

}
