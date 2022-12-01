import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipeService } from './recipe/recipe.service';

import { Recipe, RecipeSchema } from './recipe/recipe.schema';
import { RecipeController } from './recipe/recipe.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class DataModule {}