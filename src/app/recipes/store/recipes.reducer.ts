import { Action } from "@ngrx/store";
import { Recipe } from "../recipe-list/recipe.model";
import * as RecipesActions from "./recipes.actions";

export interface RecipesState {
    recipes: Recipe[];
    lastItemIndex: number;
}

const initialState: RecipesState = {
    recipes: [],
    lastItemIndex: 0,
};

export function recipesReducer(state: RecipesState = initialState, action: Action): RecipesState {
    switch (action.type) {
        case RecipesActions.SET_RECIPES:
            const setRecipesAction = action as RecipesActions.SetRecipes;
            return {
                ...state,
                recipes: [...setRecipesAction.payload],
                lastItemIndex: setRecipesAction.payload.length - 1,
            }
        case RecipesActions.ADD_RECIPE:
            const addRecipeAction = action as RecipesActions.AddRecipe;
            return {
                ...state,
                recipes: [...state.recipes, addRecipeAction.payload],
                lastItemIndex: state.lastItemIndex + 1,
            }
        case RecipesActions.UPDATE_RECIPE:
            const updateRecipeAction = action as RecipesActions.UpdateRecipe;
            const updatedRecipe = {
                ...state.recipes[updateRecipeAction.payload.index],
                ...updateRecipeAction.payload.newRecipe
            } as Recipe;
            const updatedRecipes = [...state.recipes];
            updatedRecipes[updateRecipeAction.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: updatedRecipes,
            }
        case RecipesActions.DELETE_RECIPE:
            const deleteRecipeAction = action as RecipesActions.DeleteRecipe;
            return {
                ...state,
                recipes: state.recipes.filter((_recipe, index) => index != deleteRecipeAction.payload),
                lastItemIndex: state.lastItemIndex - 1,
            }
    }
    return state;
}
