import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shared/services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  subscription!: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientsChanged.subscribe(
      () => {
        this.ingredients = this.shoppingService.getIngredients();
      }
    );
  }

}