import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable()
export class RecipesService {
  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Pizza', 
  //     'Delicious Home-made Pizza', 
  //     'https://www.vegrecipesofindia.com/wp-content/uploads/2020/11/pizza-recipe-2-500x500.jpg',
  //     [
  //       new Ingredient('Tomato', 2),
  //       new Ingredient('Onion', 1),
  //       new Ingredient('Cheese', 0.25),
  //     ]),
  //   new Recipe(
  //     'Noodles', 
  //     'Healthy Veg Noodles', 
  //     'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/veg-noodles-vegetable-noodles-recipe-500x500.jpg',
  //     [
  //       new Ingredient('Noodles', 1),
  //       new Ingredient('Chillie', 5),
  //       new Ingredient('Curry Leaves', 4),
  //       new Ingredient('Water', 1),
  //     ]),
  // ];

  recipes: Recipe[] = [];

  recipesChanged = new Subject();

  constructor(private shoppingService: ShoppingService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(null);
  }

  getRecipe(index: number): Recipe{
    // let recipe = this.recipes.find(
    //   r => r.id == index
    // );
    // return recipe ?? new Recipe(0, '', '', '', []);
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(null);
  }

  updateRecipe(index: number, updatedRecipe: Recipe){
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next(null);
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(null);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingService.addIngredients(...ingredients);
  }

  get lastItemIndex(){
    return this.recipes.length - 1;
  }
}
