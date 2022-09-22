import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recordIndex: number = 0;
  editMode: boolean = false;
  modelForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private recipesService: RecipesService, private formBuilder: FormBuilder, private router: Router) { }

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
      let recipe = this.recipesService.getRecipe(this.recordIndex);
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

  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.modelForm.value['name'],
    //   this.modelForm.value['description'],
    //   this.modelForm.value['imagePath'],
    //   this.modelForm.value['ingredients'],
    // );
    const newRecipe: Recipe = this.modelForm.value;

    if (this.editMode) {
      this.recipesService.updateRecipe(this.recordIndex, newRecipe);
      this.onCancel();
    }
    else{
      this.recipesService.addRecipe(newRecipe);
      this.router.navigate(['../', this.recipesService.lastItemIndex], {relativeTo: this.activatedRoute});
    } 
  }

  get ingredients(): FormArray {
    return <FormArray>this.modelForm.get('ingredients');
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onClear(){
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

  onRemoveIngredient(index: number){
    this.ingredients.removeAt(index);
  }

  onRemoveAllIngredients(){
    this.ingredients.clear();
  }

}
