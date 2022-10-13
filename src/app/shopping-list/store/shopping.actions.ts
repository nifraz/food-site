import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping] Add Ingredient';
export class AddIngredient implements Action {
    readonly type: string = ADD_INGREDIENT;
    constructor(public payload: Ingredient) { }
}

export const ADD_INGREDIENTS = '[Shopping] Add Ingredients';
export class AddIngredients implements Action {
    readonly type: string = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) { }
}

export const UPDATE_INGREDIENT = '[Shopping] Update Ingredient';
export class UpdateIngredient implements Action {
    readonly type: string = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient) { }
}

export const DELETE_INGREDIENT = '[Shopping] Delete Ingredient';
export class DeleteIngredient implements Action {
    readonly type: string = DELETE_INGREDIENT;
    constructor(public payload: number) { }
}

export const START_EDIT = '[Shopping] Start Edit';
export class StartEdit implements Action {
    readonly type: string = START_EDIT;
    constructor(public payload: number) { }
}

export const END_EDIT = '[Shopping] End Edit';
export class EndEdit implements Action {
    readonly type: string = END_EDIT;
}