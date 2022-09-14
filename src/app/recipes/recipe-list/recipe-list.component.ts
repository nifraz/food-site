import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  recipesChangedSub!: Subscription;

  constructor(private recipesService: RecipesService) {

  }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.recipesChangedSub = this.recipesService.recipesChanged.subscribe(() => {
      this.recipes = this.recipesService.getRecipes();
    });
  }

  ngOnDestroy(): void {
    this.recipesChangedSub.unsubscribe();
  }

}
