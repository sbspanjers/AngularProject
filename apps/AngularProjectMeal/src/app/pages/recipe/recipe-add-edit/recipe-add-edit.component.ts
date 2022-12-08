import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient, Step } from '../../../../../../../libs/data/src';
import { Recipe } from '../../../../../../../libs/data/src/lib/recipe.model'
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-add-edit',
  templateUrl: './recipe-add-edit.component.html',
  styleUrls: ['./recipe-add-edit.component.css'],
})
export class RecipeAddEditComponent implements OnInit {
  recipeId: string | null = null;
  recipe: Recipe = new Recipe;
  editRecipe = new Recipe;
  recipeExists = false;
  
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, 
    private router: Router, private elemRef: ElementRef) {}

  ngOnInit(): void {    
    this.route.paramMap.subscribe((params) => {
      this.recipeId = params.get('id');
      if (this.recipeId) {
        this.recipeService.getRecipeById(this.recipeId).pipe().subscribe((recipeData: Recipe) => {
          this.recipe = recipeData;
          this.editRecipe.id = this.recipe!.id;
          this.editRecipe.name = this.recipe!.name;
          this.editRecipe.createDate = new Date(Date.now());
          this.editRecipe.imgUrl = this.recipe!.imgUrl;
          this.editRecipe.personCount = this.recipe!.personCount;
          this.editRecipe.cookingTime = this.recipe!.cookingTime;
          this.editRecipe.kcal = this.recipe!.kcal;
          this.editRecipe.typeMeal = this.recipe!.typeMeal;
          this.editRecipe.steps = this.recipe!.steps || [];
          this.editRecipe.ingredients = this.recipe!.ingredients || [];
          this.recipeExists = true;
        });
      } else {
        this.recipe = new Recipe();
      }
    })
  }

  onSubmit(): void {
    if(this.recipeExists) {
      console.log('submit edit recipe');
      this.recipeService.editRecipe(this.editRecipe!).subscribe((output: any) => {
        this.router.navigate(['recipes/' + this.recipeId]);
      });
    } else {
      console.log('submit add recipe');
      this.recipeService.addRecipe(this.editRecipe!).subscribe((output: Recipe) => {
        this.router.navigate(['recipes/' + output.id ]);
      })
    }
  }

  addNewStepFromEnter(event) {
    this.addNewStep();

    setTimeout(() => {
      event.target.parentElement.parentNode.lastElementChild.firstChild.focus();
    }, 0);
  }

  addNewStep() {
      this.editRecipe.steps.push(new Step(' '));
  }

  deleteLastStep() {
    this.editRecipe.steps.pop();
  }

  addNewIngredientFromEnter(event) {
    this.addNewIngredient();
    setTimeout(() => {
      event.target.parentElement.parentNode.parentNode.lastElementChild.firstChild.firstChild.focus().selectAll();
    }, 0);
  }

  addNewIngredient() {
    this.editRecipe.ingredients.push(new Ingredient('Nieuw ingrediënt', 0, ' '));
  }

  deleteLastIngredient() {
    this.editRecipe.ingredients.pop();
  }
}
