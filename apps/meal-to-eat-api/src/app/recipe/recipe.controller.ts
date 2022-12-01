import { Recipe } from '@MealToEat/data';
import { Controller, Get } from '@nestjs/common';

import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getAll(): Promise<Recipe[]> {
    return this.recipeService.getAll();
  }
}