import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from 'src/app/recipes/recipe-list/recipe.model';
import { Ingredient } from '../ingredient.model';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private readonly ENDPOINT_URL: string = 'https://recipe-book-5768e-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

  constructor(
    private httpClient: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) { }

  saveRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    //console.log(recipes);
    this.httpClient.put(this.ENDPOINT_URL, recipes).subscribe(res => console.log(res));
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.authService.user.pipe(
      exhaustMap(user => {
        //console.log(user);
        return this.httpClient.get<Recipe[]>(this.ENDPOINT_URL);
      }),
      map(res => {
        return res.map(
          recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ?? []
            };
          }
        )
      }),
      tap(recipes => this.recipesService.setRecipes(recipes))
    );
  }
}
