import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { Recipe } from '../recipe-list/recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
import * as ShoppingActions from '../../shopping-list/store/shopping.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;
  index!: number;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map(params => +params['id']),
      tap(id => this.index = id),
      switchMap(id => this.store.select('recipes')),
      map(state => state.recipes.find((recipe, index) => index === this.index))
    )
    .subscribe(recipeRecord => this.recipe = recipeRecord ?? Recipe.EMPTY);
    // this.activatedRoute.params.subscribe(
    //   params => {
    //     this.index = +params['id'];
    //     this.recipe = this.recipesService.getRecipe(this.index);
    //   }
    // );
  }

  onToShoppingListClick(){
    this.store.dispatch(new ShoppingActions.AddIngredients(this.recipe?.ingredients ?? []));
  }

  onDelete(){
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.index));
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
