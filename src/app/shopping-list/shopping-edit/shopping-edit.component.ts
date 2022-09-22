import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('frm', {static: true}) ngForm!: NgForm;

  ingredientEditingSubscription!: Subscription;
  editMode: boolean = false;
  selectedIndex!: number;
  selectedIngredient!: Ingredient;

  constructor(private shoppingService: ShoppingService) { }
  ngOnDestroy(): void {
    this.ingredientEditingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredientEditingSubscription = this.shoppingService.ingredientEditingStarted.subscribe(
      i => {
        this.editMode = true;
        this.selectedIndex = i;
        this.selectedIngredient = this.shoppingService.getIngredient(i);

        this.ngForm.setValue({
          'name': this.selectedIngredient.name,
          'amount': this.selectedIngredient.amount
        });
      }
    );
  }

  // onAddClick(nameInput: HTMLInputElement, amountInput: HTMLInputElement){
  //   this.shoppingService.addIngredients(new Ingredient(nameInput.value, +amountInput.value));
  // }

  onSubmit(){
    let newIngredient = new Ingredient(this.ngForm.value.name, +this.ngForm.value.amount);
    if (this.editMode) {
      this.shoppingService.editIngredient(this.selectedIndex, newIngredient);
    }
    else{
      this.shoppingService.addIngredients(newIngredient);
    }
    this.onClear();
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.selectedIndex);
    this.onClear();
  }

  onClear(){
    this.editMode = false;
    this.ngForm.reset();
  }
}
