import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN = '[Auth] Login';
export class Login implements Action {
    readonly type: string = LOGIN;
    constructor(public payload: User) { }
}

export const LOGOUT = '[Auth] Logout';
export class Logout implements Action {
    readonly type: string = LOGOUT;
}
