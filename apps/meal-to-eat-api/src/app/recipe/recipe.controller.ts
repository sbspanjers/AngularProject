import { Recipe } from '@MealToEat/data';
import { Controller, Delete, Get, Param } from '@nestjs/common';

import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getAll(): Promise<Recipe[]> {
    return this.recipeService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.getOne(id)
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<boolean> {
    console.log('ff testen');
    
    return this.recipeService.deleteOne(id);
  }
}