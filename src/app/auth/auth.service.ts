import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponseModel } from './auth-response-model';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly REGISTER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`;
  private readonly LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`;

  private autoLogoutTimer: any;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  /**
   * Sets the auto logout timer.
   *
   * @remarks
   * This method is part of the Angular training.
   *
   * @param duration - The duration (in milliseconds)
   * @returns void
   *
   * @beta
   */
  setAutoLogout(duration: number) {
    console.log(duration);
    this.autoLogoutTimer = setTimeout(() => this.store.dispatch(new AuthActions.Logout()), duration);
  }

  clearAutoLogout() {
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
  }

}
