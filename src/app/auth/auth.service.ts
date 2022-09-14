import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, delay, Observable, Subject, tap, throwError } from 'rxjs';
import { AuthRequestModel } from './auth-request-model';
import { AuthResponseModel } from './auth-response-model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_KEY = 'AIzaSyDmHdwEARoTbyZCSf0pSuIdM7a5NMgCqY4';
  private readonly REGISTER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  private readonly LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;

  private autoLogoutTimer: any;

  public user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient, private router: Router) { }

  register(authRequestModel: AuthRequestModel): Observable<AuthResponseModel> {
    return this.httpClient.post<AuthResponseModel>(this.REGISTER_URL, authRequestModel)
      .pipe(
        //delay(3000),
        tap(authResponseModel => this.handleAuth(authResponseModel)),
        catchError(this.handleError)
      );
  }

  login(authRequestModel: AuthRequestModel): Observable<AuthResponseModel> {
    return this.httpClient.post<AuthResponseModel>(this.LOGIN_URL, authRequestModel)
      .pipe(
        //delay(3000),
        tap(this.handleAuth.bind(this)),
        //tap(authResponseModel => this.handleAuth(authResponseModel)), //alternative way to fix .this issue
        catchError(this.handleError)
      );
  }

  autoLogin() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userObject: { email: string, id: string, _token: string, _tokenExpirationDate: string } = JSON.parse(userString);
      if (userObject) {
        const tokenExpirationDate = new Date(userObject._tokenExpirationDate)
        const user = new User(userObject.email, userObject.id, userObject._token, tokenExpirationDate);
        this.setAutoLogout(tokenExpirationDate.getTime() - new Date().getTime());
        this.user.next(user);
      }
    }
  }

  logout() {
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
    localStorage.removeItem('user');
    //console.log(this);
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

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
  setAutoLogout(duration: number){
    //console.log(duration);
    this.autoLogoutTimer = setTimeout(() => this.logout(), duration);
  }

  private handleAuth(authResponseModel: AuthResponseModel) {
    const tokenExpirationDate = new Date(new Date().getTime() + (+authResponseModel.expiresIn * 1000));
    const user = new User(authResponseModel.email, authResponseModel.localId, authResponseModel.idToken, tokenExpirationDate);
    localStorage.setItem('user', JSON.stringify(user));
    this.setAutoLogout(+authResponseModel.expiresIn * 1000);
    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    const error = new Error('An error occured while processing the request!');
    switch (errorResponse?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        error.message = 'The email address already registered!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        error.message = 'This operation is not allowed by the server!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        error.message = 'You have performed too many failed login attempts!';
        break;
      case 'EMAIL_NOT_FOUND':
        error.message = 'The email address was not found!';
        break;
      case 'INVALID_PASSWORD':
        error.message = 'You have entered an invalid password!';
        break;
      case 'USER_DISABLED':
        error.message = 'Login was disabled for this email!';
        break;
      // default:
      //   break;
    }
    return throwError(() => error);
  }
}
