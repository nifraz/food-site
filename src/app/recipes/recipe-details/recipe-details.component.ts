import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  index!: number;

  constructor(private recipesService: RecipesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.index = +params['id'];
        this.recipe = this.recipesService.getRecipe(this.index);
      }
    );
  }

  onToShoppingListClick(){
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDelete(){
    this.recipesService.deleteRecipe(this.index);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
