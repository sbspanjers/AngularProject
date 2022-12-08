import { Recipe } from "./recipe.model";

export class User {
  id = '';
  name = '';
  emailAddress = '';
  favRecipes: Recipe[] = [];

  constructor(id = '', name = '', emailAddress = '', favRecipes = []) {
    this.id = id;
    this.name = name;
    this.emailAddress = emailAddress;
    this.favRecipes = favRecipes;
  }
}
