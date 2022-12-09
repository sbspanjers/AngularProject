import { Recipe, User } from '@MealToEat/data';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

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

  @Get('/fav/:id')
  async getAllFav(@Param('id') id: string): Promise<User> {
    return this.recipeService.getAllFav(id);
  }

  @Put('/fav')
  async makeRecipeFav(@Body() body: any): Promise<Recipe> {
    console.log(body);
    
    return this.recipeService.makeRecipeFav(body.user, body.recipeToFav);
  }

  @Put('/noFav')
  async makeRecipeNOTFav(@Body() body: any): Promise<Recipe> {
    console.log(body);
    
    return this.recipeService.makeRecipeNOTFav(body.user, body.recipeToNotFav);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    return this.recipeService.deleteOne(id);
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() newData: Recipe): Promise<any> {   
    return this.recipeService.updateOne(id, newData);
  }

  @Post()
  async createOne(@Body() newRecipe: Recipe): Promise<any> {
    return this.recipeService.createOne(newRecipe);
  }
}