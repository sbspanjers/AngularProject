import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../../../../libs/data/src/lib/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService) {
    recipeService.getRecipes().pipe().subscribe((recipesData: Recipe[]) => {
      this.recipes = recipesData;   
    });
  }

  ngOnInit(): void {}
}
