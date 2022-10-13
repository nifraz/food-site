import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingActions from "./shopping.actions";

export interface ShoppingState {
    ingredients: Ingredient[];
    selectedIndex: number;
    selectedIngredient: Ingredient | null;
}

const initialState: ShoppingState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 8)
    ],
    selectedIndex: -1,
    selectedIngredient: null,
};

export function shoppingReducer(state: ShoppingState = initialState, action: Action): ShoppingState {
    switch (action.type) {
        case ShoppingActions.ADD_INGREDIENT:
            const addIngredientAction = action as ShoppingActions.AddIngredient;
            return {
                ...state,
                ingredients: [...state.ingredients, addIngredientAction.payload]
            }
        case ShoppingActions.ADD_INGREDIENTS:
            const addIngredientsAction = action as ShoppingActions.AddIngredients;
            return {
                ...state,
                ingredients: [...state.ingredients, ...addIngredientsAction.payload]
            }
        case ShoppingActions.UPDATE_INGREDIENT:
            const updateIngredientAction = action as ShoppingActions.UpdateIngredient;
            const ingredient = state.ingredients[state.selectedIndex];
            const updatedIngredient = {
                ...ingredient,
                ...updateIngredientAction.payload
            }
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.selectedIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                selectedIndex: -1,
                selectedIngredient: null
            }
        case ShoppingActions.DELETE_INGREDIENT:
            const deleteIngredientAction = action as ShoppingActions.DeleteIngredient;
            return {
                ...state,
                ingredients: state.ingredients.filter((e, i) => i !== deleteIngredientAction.payload),
                selectedIndex: -1,
                selectedIngredient: null
            }
        case ShoppingActions.START_EDIT:
            const startEditAction = action as ShoppingActions.StartEdit;
            return {
                ...state,
                selectedIndex: startEditAction.payload,
                selectedIngredient: {...state.ingredients[startEditAction.payload]}
            }
        case ShoppingActions.END_EDIT:
            return {
                ...state,
                selectedIndex: -1,
                selectedIngredient: null
            }
    }
    return state;
}
