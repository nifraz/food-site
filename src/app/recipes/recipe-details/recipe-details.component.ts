import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { ShoppingService } from 'src/app/shared/services/shopping.service';
import { Recipe } from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;
  constructor(private recipesService: RecipesService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      params => {
        this.recipe = this.recipesService.getRecipe(+params['id']);
      }
    );
  }

  onToShoppingListClick(){
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
