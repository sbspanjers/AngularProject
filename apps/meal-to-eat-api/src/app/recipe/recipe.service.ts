import { Injectable } from "@nestjs/common";

import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Recipe } from '@MealToEat/data';
import { RecipeDocument, Recipe as RecipeModel } from "./recipe.schema";

@Injectable()
export class RecipeService {
    constructor(@InjectModel(RecipeModel.name) private recipeModel: Model<RecipeDocument>) {}

    async getAll(): Promise<Recipe[]> {
        console.log("API: get all recipes aangeroepen!");
        
        return this.recipeModel.find();
    }

    async getOne(recipeId: string): Promise<Recipe> {
        console.log('API: get one recipe (id: '+ recipeId +') aangeroepen!');
        const users = await this.recipeModel.aggregate([{ $match: { id: recipeId }}]);        
        return users[0];
    }

    async deleteOne(recipeId: string): Promise<boolean> {
        console.log('API: delete recipe ' + recipeId);

        this.recipeModel.findByIdAndRemove([{ $match: { id: recipeId }}]);

        return true;
    }
}