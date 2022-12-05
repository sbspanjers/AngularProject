import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../../../../../libs/data/src/lib/recipe.model'
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-add-edit',
  templateUrl: './recipe-add-edit.component.html',
  styleUrls: ['./recipe-add-edit.component.css'],
})
export class RecipeAddEditComponent implements OnInit {
  recipeId: string | null = null;
  recipe: Recipe | null = null;
  editRecipe = new Recipe('', new Date(Date.now()), '', 0, 0, 0, '');
  recipeExists = false;
  
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, 
    private router: Router) {}

  ngOnInit(): void {    
    this.route.paramMap.subscribe((params) => {
      this.recipeId = params.get('id');
      if (this.recipeId) {
        this.recipeService.getRecipeById(this.recipeId).pipe().subscribe((recipeData: Recipe) => {
          this.recipe = recipeData;
        });
        this.editRecipe.id = this.recipe!.id;
        this.editRecipe.name = this.recipe!.name;
        this.editRecipe.createDate = new Date(Date.now());
        this.editRecipe.imgUrl = this.recipe!.imgUrl;
        this.editRecipe.personCount = this.recipe!.personCount;
        this.editRecipe.cookingTime = this.recipe!.cookingTime;
        this.editRecipe.kcal = this.recipe!.kcal;
        this.editRecipe.typeMeal = this.recipe!.typeMeal;
        this.recipeExists = true;
      } else {
        this.recipe = new Recipe();
      }
    })
  }

  onSubmit(): void {
    if(this.recipeExists) {
      console.log('submit edit recipe');
      this.recipeService.editRecipe(this.editRecipe!)
    } else {
      console.log('submit add recipe');
      this.recipeService.addRecipe(this.editRecipe!)
    }
    this.router.navigate(['recipes'])
  }
}
