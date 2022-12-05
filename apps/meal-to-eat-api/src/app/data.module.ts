import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipeService } from './recipe/recipe.service';

import { Recipe, RecipeSchema } from './recipe/recipe.schema';
import { RecipeController } from './recipe/recipe.controller'
import { User } from '@MealToEat/data';
import { UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [RecipeController, UserController],
  providers: [RecipeService, UserService],
})
export class DataModule {}