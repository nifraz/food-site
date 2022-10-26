import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import * as RecipesActions from "./recipes.actions";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipe-list/recipe.model";
import * as fromRecipes from './recipes.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class RecipesEffects {
    private readonly ENDPOINT_URL: string = 'https://recipe-book-5768e-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap((action: RecipesActions.FetchRecipes) =>
            this.httpClient.get<Recipe[]>(this.ENDPOINT_URL)
        ),
        map(res => {
            if (res) {
                return res.map(
                    recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ?? []
                        } as Recipe
                    }
                );
            }
            else {
                return [];
            }
        }),
        map(recipes => {
            //console.log(recipes);
            return new fromRecipes.SetRecipes(recipes);
        })
    );

    @Effect({ dispatch: false })
    saveRecipes = this.actions$.pipe(
        ofType(RecipesActions.SAVE_RECIPES),
        withLatestFrom(this.store.select('recipes').pipe(map(state => state.recipes))),
        tap(([action, recipes]) => {
            this.httpClient.put(this.ENDPOINT_URL, recipes).subscribe(res => console.log(res));
        })
    );

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }
}