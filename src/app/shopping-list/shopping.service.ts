import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingService {
  ingredientsChanged = new Subject();
  ingredientEditingStarted = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 8)
  ];
  constructor() { }

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient{
    return this.ingredients[index];
  }

  addIngredients(...ingredient: Ingredient[]){
    this.ingredients.push(...ingredient);
    this.ingredientsChanged.next(null);
  }

  editIngredient(index: number, updatedIngredient: Ingredient){
    this.ingredients[index] = updatedIngredient;
    this.ingredientsChanged.next(null);
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(null);
  }
}
