import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { ShoppingState } from './store/shopping.reducer';
import * as fromApp from '../store/app.reducer';
import * as ShoppingActions from "./store/shopping.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients$!: Observable<ShoppingState>;
  //subscription!: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList');
    // this.subscription = this.shoppingService.ingredientsChanged.subscribe(
    //   () => {
    //     this.ingredients = this.shoppingService.getIngredients();
    //   }
    // );
    this.loggingService.writeLog('ShoppingListComponent');
  }

  onIngredientSelect(i: number){
    this.store.dispatch(new ShoppingActions.StartEdit(i));
    //this.shoppingService.ingredientEditingStarted.next(i);
  }

}
