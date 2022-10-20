import { Action } from "@ngrx/store";
import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: boolean;
    errorMessage: string;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: false,
    errorMessage: '',
};

export function authReducer(state: AuthState = initialState, action: Action): AuthState {
    //debugger;
    console.log('action reduced', action.type);
    switch (action.type) {
        case AuthActions.LOGIN_START:
        case AuthActions.REGISTER_START:
            return {
                ...state,
                user: null,
                loading: true,
                error: false,
                errorMessage: '',
            }
        case AuthActions.AUTH_SUCCESS:
            const loginSuccessAction = action as AuthActions.AuthSuccess;
            return {
                ...state,
                user: loginSuccessAction.payload,
                loading: false,
                error: false,
                errorMessage: '',
            }
        case AuthActions.AUTH_FAIL:
            const loginFailAction = action as AuthActions.AuthFail;
            return {
                ...state,
                user: null,
                loading: false,
                error: true,
                errorMessage: loginFailAction.payload,
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
                error: false,
                errorMessage: '',
            }
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                //user: null,
                loading: false,
                error: false,
                errorMessage: '',
            }
    }
    return state;
}
