import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../../../../../libs/data/src/lib/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css'],
})
export class SingleRecipeComponent implements OnInit {
  recipeId: string | null = null;
  recipe: Recipe | null = null;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute
    , private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.recipeId = params.get('id');
      if (this.recipeId) {
        this.recipeService.getRecipeById(this.recipeId).subscribe((recipeData: Recipe) => {
          this.recipe = recipeData;
        });
      } else {
        this.recipe = new Recipe();
      }
    });
  }

  deleteRecipe(): void { 
    this.recipeService.deleteRecipe(this.recipeId!).subscribe((output: any) => {
      console.log("Deleted recipes: " + output.deletedCount);
    });
    this.router.navigate(['recipes']);
  }
}
