import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Recipe } from './recipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  recipesChangedSub!: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
    ) {
  }

  ngOnInit(): void {
    // this.store.select('recipes')
    // .pipe(map(state => state.recipes))
    // .subscribe(recipes => this.recipes = recipes);
    this.recipesChangedSub = this.store.select('recipes')
    .pipe(map(state => state.recipes))
    .subscribe(recipes => this.recipes = recipes);
  }

  ngOnDestroy(): void {
    this.recipesChangedSub.unsubscribe();
  }

}
