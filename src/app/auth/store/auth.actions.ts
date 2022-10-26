import { Action } from "@ngrx/store";
import { AuthRequestModel } from "../auth-request-model";
import { User } from "../user.model";

export const LOGIN_START = '[Auth] Login Start';
export class LoginStart implements Action {
    readonly type: string = LOGIN_START;
    constructor(public payload: AuthRequestModel) { }
}

export const REGISTER_START = '[Auth] Register Start';
export class RegisterStart implements Action {
    readonly type: string = REGISTER_START;
    constructor(public payload: AuthRequestModel) { }
}

export const AUTH_SUCCESS = '[Auth] Auth Success';
export class AuthSuccess implements Action {
    readonly type: string = AUTH_SUCCESS;
    constructor(public payload: { user: User, redirect: boolean }) { }
}

export const AUTH_FAIL = '[Auth] Auth Fail';
export class AuthFail implements Action {
    readonly type: string = AUTH_FAIL;
    constructor(public payload: string) { }
}

export const LOGOUT = '[Auth] Logout';
export class Logout implements Action {
    readonly type: string = LOGOUT;
}

export const CLEAR_ERROR = '[Auth] Clear Error';
export class ClearError implements Action {
    readonly type: string = CLEAR_ERROR;
}

export const AUTO_LOGIN = '[Auth] Auto Login';
export class AutoLogin implements Action {
    readonly type: string = AUTO_LOGIN;
}

export const DUMMY = '[Auth] Dummy';
export class Dummy implements Action {
    readonly type: string = DUMMY;
}
