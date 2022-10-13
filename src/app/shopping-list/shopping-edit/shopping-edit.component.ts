import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model'
import * as fromApp from '../../store/app.reducer';
import * as ShoppingActions from "../store/shopping.actions";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('frm', { static: true }) ngForm!: NgForm;

  ingredientEditingSubscription!: Subscription;
  editMode: boolean = false;
  selectedIndex!: number;
  selectedIngredient!: Ingredient | null;

  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingActions.EndEdit());
    this.ingredientEditingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredientEditingSubscription = this.store.select('shoppingList').subscribe(
      state => {
        if (state.selectedIndex === -1) {
          this.editMode = false;
        }
        else {
          this.editMode = true;
          this.selectedIndex = state.selectedIndex;
          this.selectedIngredient = state.selectedIngredient;

          this.ngForm.setValue({
            'name': this.selectedIngredient?.name,
            'amount': this.selectedIngredient?.amount
          });
        }
      }
    )
  }

  // onAddClick(nameInput: HTMLInputElement, amountInput: HTMLInputElement){
  //   this.shoppingService.addIngredients(new Ingredient(nameInput.value, +amountInput.value));
  // }

  onSubmit() {
    let newIngredient = new Ingredient(this.ngForm.value.name, +this.ngForm.value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingActions.UpdateIngredient(newIngredient));
    }
    else {
      this.store.dispatch(new ShoppingActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onDelete() {
    this.store.dispatch(new ShoppingActions.DeleteIngredient(this.selectedIndex));
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.ngForm.reset();
    this.store.dispatch(new ShoppingActions.EndEdit());
  }
}
