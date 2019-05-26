import { Injectable,NgZone } from '@angular/core';
import { User } from "../models/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
userData: any;
successMessage: string = '';
  constructor(public afs: AngularFirestore,  
    public afAuth: AngularFireAuth,public ngZone: NgZone,public router :Router) { 
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        
       var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }
get authenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.afAuth.authState : null;
  }
SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
       
      }).catch((error) => {
        window.alert(error.message)
      })
  }

    SignUp(email, password,contact,organ,name,image) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {

       this.successMessage = "Your account has been created";

        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${result.user.uid}`);
    const userData: User = {
      uid: result.user.uid,
      email: result.user.email,
      organization: organ,
      contactno: contact,
      name:name,
      image:image
    }
    return userRef.set(userData, {
    
      merge: true
    })
    this.successMessage = "Your account has been created";
       
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
   isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.email !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      contactno: user.contactno,
      organization: user.organization,
      image:user.image,
      name:user.image
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

}
