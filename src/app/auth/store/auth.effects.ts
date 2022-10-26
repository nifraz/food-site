import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthResponseModel } from "../auth-response-model";
import * as AuthActions from "./auth.actions";
import { environment } from '../../../environments/environment';
import { Injectable } from "@angular/core";
import { User } from "../user.model";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthEffects {
    private readonly LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`;
    private readonly REGISTER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`;

    @Effect()
    loginStart = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((action: AuthActions.LoginStart) =>
            this.httpClient.post<AuthResponseModel>(this.LOGIN_URL, action.payload)
                .pipe(
                    //delay(3000),
                    tap(authResponseModel => {
                        this.authService.setAutoLogout(+authResponseModel.expiresIn * 1000);
                    }),
                    map(authResponseModel => {
                        return handleSuccess(authResponseModel);
                    }),
                    catchError(errorResponse => {
                        return handleError(errorResponse);
                    })
                )
        )
    );

    @Effect()
    registerStart = this.actions$.pipe(
        ofType(AuthActions.REGISTER_START),
        switchMap((action: AuthActions.RegisterStart) =>
            this.httpClient.post<AuthResponseModel>(this.REGISTER_URL, action.payload)
                .pipe(
                    //delay(3000),
                    tap(authResponseModel => {
                        this.authService.setAutoLogout(+authResponseModel.expiresIn * 1000);
                    }),
                    map(authResponseModel => {
                        return handleSuccess(authResponseModel);
                    }),
                    catchError(errorResponse => {
                        return handleError(errorResponse);
                    })
                )
        )
    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap((action: AuthActions.AuthSuccess) => {
            if (action.payload.redirect) {
                this.router.navigate(['/']);
            }
        })
    );

    @Effect({ dispatch: false })
    logout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap((action: AuthActions.Logout) => {
            this.authService.clearAutoLogout();
            localStorage.removeItem('user');
            this.router.navigate(['/auth']);
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map((action: AuthActions.AutoLogin) => {
            const userString = localStorage.getItem('user');
            if (userString) {
                const userObject: { email: string, id: string, _token: string, _tokenExpirationDate: string } = JSON.parse(userString);
                if (userObject) {
                    const tokenExpirationDate = new Date(userObject._tokenExpirationDate)
                    const user = new User(userObject.email, userObject.id, userObject._token, tokenExpirationDate);
                    this.authService.setAutoLogout(tokenExpirationDate.getTime() - new Date().getTime());
                    //console.log('autologin', user);
                    return new AuthActions.AuthSuccess({ user: user, redirect: false });
                }
            }
            return new AuthActions.Dummy();
        })
    );

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }
}

const handleSuccess = (authResponseModel: AuthResponseModel) => {
    const tokenExpirationDate = new Date(new Date().getTime() + (+authResponseModel.expiresIn * 1000));
    const user = new User(authResponseModel.email, authResponseModel.localId, authResponseModel.idToken, tokenExpirationDate);
    localStorage.setItem('user', JSON.stringify(user));
    return new AuthActions.AuthSuccess({ user: user, redirect: true });
};

const handleError = (errorResponse: HttpErrorResponse) => {
    let errorMessage = 'An error occured while processing the request!';
    switch (errorResponse?.error?.error?.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'The email address already registered!';
            break;
        case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'This operation is not allowed by the server!';
            break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'You have performed too many failed login attempts!';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'The email address was not found!';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'You have entered an invalid password!';
            break;
        case 'USER_DISABLED':
            errorMessage = 'Login was disabled for this email!';
            break;
    }
    return of(new AuthActions.AuthFail(errorMessage));
};