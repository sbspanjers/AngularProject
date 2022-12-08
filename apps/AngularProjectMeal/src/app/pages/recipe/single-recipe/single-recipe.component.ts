import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../../../libs/data/src';
import { Recipe } from '../../../../../../../libs/data/src/lib/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css'],
})
export class SingleRecipeComponent implements OnInit {
  recipeId: string | null = null;
  recipe: Recipe = new Recipe;
  isInCooklist = false;
  usersFavs: Recipe[] = []; 

  constructor(private recipeService: RecipeService, private route: ActivatedRoute
    , private router: Router, private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.recipeId = params.get('id');
      if (this.recipeId) {
        this.recipeService.getRecipeById(this.recipeId).subscribe((recipeData: Recipe) => {
          this.recipe = recipeData;
        });
        this.recipeService.getFavRecipes().subscribe((user: User) => {
          this.usersFavs = user.favRecipes;

          this.usersFavs.forEach(fav => {
            if(fav.id == this.recipeId) {
              this.isInCooklist = true;
            }
          });
        })
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

  addRemoveCooklist() {
    if (this.isInCooklist) {
      //verweider
      this.recipeService.makeRecipNOTFav(this.recipe!).subscribe((recipe: Recipe) => {
        const user = JSON.parse(localStorage.getItem('user') || '');
        user.favRecipes.pop(this.recipe);
        localStorage.setItem('user', JSON.stringify(user));

        this.isInCooklist = false;
      });
    } else {
      //voeg toe
      this.recipeService.makeRecipeFav(this.recipe!).subscribe((recipe: Recipe) => {
        const user = JSON.parse(localStorage.getItem('user') || '');
        user.favRecipes.push(this.recipe);
        localStorage.setItem('user', JSON.stringify(user));
        
        this.isInCooklist = true;
      });
    }
  }
}
