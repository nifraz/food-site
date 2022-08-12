import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientsChanged = new Subject();

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 8)
  ];
  constructor() { }

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  addIngredients(...ingredient: Ingredient[]){
    this.ingredients.push(...ingredient);
    this.ingredientsChanged.next(null);
  }
}
