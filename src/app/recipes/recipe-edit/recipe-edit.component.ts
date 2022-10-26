import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe-list/recipe.model';
import * as fromApp from '../../store/app.reducer';
import { map, pipe, Subscription } from 'rxjs';
import * as RecipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recordIndex: number = 0;
  editMode: boolean = false;
  modelForm!: FormGroup;
  storeSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        let id = params['id'];
        this.recordIndex = +id;
        this.editMode = id != null;
        this.initForm();
      }
    );
  }

  initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray<FormGroup>([]);

    if (this.editMode) {
      this.storeSubscription = this.store.select('recipes')
        .pipe(map(state => state.recipes.find((recipe, index) => index === this.recordIndex)))
        .subscribe(recipeRecord => {
          let recipe = recipeRecord ?? Recipe.EMPTY;
          recipeName = recipe.name;
          recipeDescription = recipe.description;
          recipeImagePath = recipe.imagePath;

          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                this.formBuilder.group(
                  {
                    'name': [ingredient.name, [Validators.required]],
                    'amount': [ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
                  }
                )
              );
            }
          }
        });
    }

    // this.modelForm = new FormGroup({
    //   'name': new FormControl(recipeName),
    //   'description': new FormControl(recipeDescription),
    //   'imagePath': new FormControl(recipeImagePath),
    //   'ingredients': recipeIngredients
    // });

    this.modelForm = this.formBuilder.group(
      {
        'name': [recipeName, [Validators.required]],
        'description': [recipeDescription, [Validators.required]],
        'imagePath': [recipeImagePath, [Validators.required]],
        'ingredients': recipeIngredients
      }
    );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.modelForm.value['name'],
    //   this.modelForm.value['description'],
    //   this.modelForm.value['imagePath'],
    //   this.modelForm.value['ingredients'],
    // );
    const newRecipe: Recipe = this.modelForm.value;

    if (this.editMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({ index: this.recordIndex, newRecipe: newRecipe }));
      this.onCancel();
    }
    else {
      this.store.dispatch(new RecipesActions.AddRecipe(newRecipe));
      this.store.select('recipes').subscribe(state => {
        this.router.navigate(['../', state.lastItemIndex], { relativeTo: this.activatedRoute });
      });
    }
  }

  get ingredients(): FormArray {
    return <FormArray>this.modelForm.get('ingredients');
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onClear() {
    this.modelForm.reset();
  }

  onAddIngredient() {
    this.ingredients.push(
      this.formBuilder.group({
        'name': ['', [Validators.required]],
        'amount': ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
      })
    );
  }

  onRemoveIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onRemoveAllIngredients() {
    this.ingredients.clear();
  }

}
