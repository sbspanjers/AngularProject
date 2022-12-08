import { Component, OnInit } from '@angular/core';
import { Recipe, User } from '../../../../../../libs/data/src';
import { RecipeService } from '../recipe/recipe.service';

@Component({
  selector: 'app-cooklist',
  templateUrl: './cooklist.component.html',
  styleUrls: ['./cooklist.component.css'],
})
export class CooklistComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getFavRecipes().subscribe((user: User) => {
      this.recipes = user.favRecipes;
    });
  }
}
