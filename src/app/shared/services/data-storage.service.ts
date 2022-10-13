import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe-list/recipe.model';
import { RecipesService } from 'src/app/recipes/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private readonly ENDPOINT_URL: string = 'https://recipe-book-5768e-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

  constructor(
    private httpClient: HttpClient,
    private recipesService: RecipesService,
  ) { }

  saveRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    //console.log(recipes);
    this.httpClient.put(this.ENDPOINT_URL, recipes).subscribe(res => console.log(res));
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.ENDPOINT_URL).pipe(
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
