import { Injectable } from "@nestjs/common";

import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Recipe, User } from '@MealToEat/data';
import { RecipeDocument, Recipe as RecipeModel } from "./recipe.schema";
import { User as UserModel, UserDocument } from '../user/user.schema'

@Injectable()
export class RecipeService {
    constructor(@InjectModel(RecipeModel.name) private recipeModel: Model<RecipeDocument>, @InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

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
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'creator',
                    foreignField: '_id',
                    as: 'creator',
                },
            },
        ]);        
        return recipes[0];
    }

    async getAllFav(userId: string): Promise<User> {
        console.log('API: get all favorites from user ' + userId);
        const userWithFavs = await this.userModel.aggregate([
            {
                $match: { id: userId },
            },
            {
                $lookup:
                {
                    from: 'recipes',
                    localField: 'favRecipes',
                    foreignField: '_id',
                    as: 'favRecipes'
                }
            }
        ])
        return userWithFavs[0];
    }

    async makeRecipeFav(user: User, recipe: Recipe): Promise<Recipe> {
        console.log('API: make recipe ' + recipe.name + ' fav');
        
        let output;
        const favRecipes = user.favRecipes;
        favRecipes.push(recipe);

        try {
            output = await this.userModel.updateOne({ "id": user.id}, { $set: {"favRecipes": favRecipes}})
        } catch (error) {
            console.log(error);
        }

        return  output;
    }

    async makeRecipeNOTFav(user: User, recipe: any): Promise<Recipe> {
        console.log(user);
        console.log(recipe);
        
        let output;

        try {
            output = await this.userModel.updateOne({ "id": user.id}, { $pull: {"favRecipes": recipe._id } })
        } catch (error) {
            console.log(error);
        }
        return output;
        
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
            output = await this.recipeModel.updateOne({ "id": id}, { $set: {"name": newData.name, "createDate": newData.createDate, "imgUrl": newData.imgUrl, "personCount": newData.personCount, "cookingTime": newData.cookingTime, "kcal": newData.kcal, "typeMeal": newData.typeMeal, "steps": newData.steps, "ingredients": newData.ingredients, "creator": newData.creator }})
        } catch (error) {
            console.log(error);
        }

        return output;
    }

    async createOne(newRecipe: Recipe): Promise<any> {
        console.log('API: create new recipe');
        
        let output;
        try {
            output = new this.recipeModel({"name": newRecipe.name, "createDate": newRecipe.createDate, "imgUrl": newRecipe.imgUrl, "personCount": newRecipe.personCount, "cookingTime": newRecipe.cookingTime, "kcal": newRecipe.kcal, "typeMeal": newRecipe.typeMeal, "steps": newRecipe.steps, "ingredients": newRecipe.ingredients, "creator": newRecipe.creator});
            await output.save();
        } catch (error) {
            console.log(error);
        }
        return output;
    }
}