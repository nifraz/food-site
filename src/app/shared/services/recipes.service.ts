import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe-list/recipe.model';
import { Ingredient } from '../ingredient.model';
import { ShoppingService } from './shopping.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes: Recipe[] = [
    new Recipe(
      1,
      'Pizza', 
      'Delicious Home-made Pizza', 
      'https://www.vegrecipesofindia.com/wp-content/uploads/2020/11/pizza-recipe-2-500x500.jpg',
      [
        new Ingredient('Tomato', 2),
        new Ingredient('Onion', 1),
        new Ingredient('Cheese', 0.25),
      ]),
    new Recipe(
      2,
      'Noodles', 
      'Healthy Veg Noodles', 
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/veg-noodles-vegetable-noodles-recipe-500x500.jpg',
      [
        new Ingredient('Noodles', 1),
        new Ingredient('Chillie', 5),
        new Ingredient('Curry Leaves', 4),
        new Ingredient('Water', 1),
      ]),
  ];

  constructor(private shoppingService: ShoppingService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe{
    let recipe = this.recipes.find(
      r => r.id == id
    );
    return recipe ?? new Recipe(0, '', '', '', []);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingService.addIngredients(...ingredients);
  }
}
