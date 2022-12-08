import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipeService } from './recipe/recipe.service';

import { Recipe, RecipeSchema } from './recipe/recipe.schema';
import { RecipeController } from './recipe/recipe.controller'
import { Ingredient, Step, User } from '@MealToEat/data';
import { StepSchema } from './step/step.schema'
import { UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { Identity, IdentitySchema } from './auth/identity.schema';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { IngredientSchema } from './ingredient/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: User.name, schema: UserSchema },
      { name: Identity.name, schema: IdentitySchema},
      { name: Step.name, schema: StepSchema },
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [RecipeController, UserController, AuthController],
  providers: [RecipeService, UserService, AuthService],
})
export class DataModule {}