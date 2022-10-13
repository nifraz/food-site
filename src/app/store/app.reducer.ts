import { ActionReducerMap } from "@ngrx/store";
import * as fromShopping from "../shopping-list/store/shopping.reducer";
import * as fromAuth from "../auth/store/auth.reducer";

export interface AppState {
    shoppingList: fromShopping.ShoppingState;
    auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShopping.shoppingReducer,
    auth: fromAuth.authReducer,
}