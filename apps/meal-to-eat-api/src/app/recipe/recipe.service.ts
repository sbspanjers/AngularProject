import { Injectable } from "@nestjs/common";

import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Recipe, } from '@MealToEat/data';
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
        const recipes = await this.recipeModel.aggregate([
            { 
                $match: { id: recipeId }, 
            },
        ]);        
        return recipes[0];
    }

    async deleteOne(recipeId: string): Promise<any> {
        console.log('API: delete recipe ' + recipeId);
        let output;

        try {
           output = await this.recipeModel.deleteOne({id: recipeId });
        } catch (error) {
            console.log(error);
            
        }
        return output;
    }

    async updateOne(id: string, newData: Recipe): Promise<any> {
        console.log('API: update recipe ' + id);
        let output;

        try {
            output = await this.recipeModel.updateOne({ "id": id}, { $set: {"name": newData.name, "createDate": newData.createDate, "imgUrl": newData.imgUrl, "personCount": newData.personCount, "cookingTime": newData.cookingTime, "kcal": newData.kcal, "typeMeal": newData.typeMeal}, "steps": newData.steps})
        } catch (error) {
            console.log(error);
        }

        return output;
    }

    async createOne(newRecipe: Recipe): Promise<any> {
        console.log('API: create new recipe');
        
        let output;
        try {
            output = new this.recipeModel({"name": newRecipe.name, "createDate": newRecipe.createDate, "imgUrl": newRecipe.imgUrl, "personCount": newRecipe.personCount, "cookingTime": newRecipe.cookingTime, "kcal": newRecipe.kcal, "typeMeal": newRecipe.typeMeal, "steps": newRecipe.steps});
            await output.save();
        } catch (error) {
            console.log(error);
        }
        return output;
    }
}