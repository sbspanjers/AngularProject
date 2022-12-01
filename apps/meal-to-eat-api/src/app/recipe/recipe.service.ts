import { Injectable } from "@nestjs/common";

import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Recipe } from '@MealToEat/data';
import { RecipeDocument, Recipe as RecipeModel } from "./recipe.schema";

@Injectable()
export class RecipeService {
    constructor(@InjectModel(RecipeModel.name) private recipeModel: Model<RecipeDocument>) {}

    async getAll(): Promise<Recipe[]> {
        console.log("API: get all users aangeroepen!");
        
        return this.recipeModel.find();
    }
}