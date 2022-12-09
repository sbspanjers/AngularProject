import { Ingredient } from "./ingredient.model";
import { Step } from "./step.model";
import { User } from "./user.model";

export class Recipe {
    id = '';
    name = '';
    createDate: Date = new Date(Date.now());
    imgUrl = '';
    personCount = 0;
    cookingTime = 0;
    kcal = 0;
    typeMeal = '';
    steps: Step[] = [];
    ingredients: Ingredient[] = [];
    creator = new User;

    constructor(name = '', createDate = new Date(Date.now()), imgUrl = '', personCount = 0, cookingTime = 0, kcal = 0, typeMeal = '', steps = [], ingredients = [], creator = new User()) {
        this.name = name;
        this.createDate = createDate;
        this.imgUrl = imgUrl;
        this.personCount = personCount;
        this.cookingTime = cookingTime;
        this.kcal = kcal;
        this.typeMeal = typeMeal;
        this.steps = steps;
        this.ingredients = ingredients;
        this.creator = creator;
    }
}