import { Action } from "@ngrx/store";
import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
};

export function authReducer(state: AuthState = initialState, action: Action): AuthState {
    switch (action.type) {
        case AuthActions.LOGIN:
            const loginAction = action as AuthActions.Login;
            return {
                ...state,
                user: loginAction.payload
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
    }
    return state;
}
