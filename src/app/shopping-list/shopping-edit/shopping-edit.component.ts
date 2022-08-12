import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { Ingredient } from '../../shared/ingredient.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  onAddClick(nameInput: HTMLInputElement, amountInput: HTMLInputElement){
    this.shoppingService.addIngredients(new Ingredient(nameInput.value, +amountInput.value));
  }
}
