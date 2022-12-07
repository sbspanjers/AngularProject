import { Step } from "./step.model";

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

    constructor(name = '', createDate = new Date(Date.now()), imgUrl = '', personCount = 0, cookingTime = 0, kcal = 0, typeMeal = '', steps = []) {
        this.name = name;
        this.createDate = createDate;
        this.imgUrl = imgUrl;
        this.personCount = personCount;
        this.cookingTime = cookingTime;
        this.kcal = kcal;
        this.typeMeal = typeMeal;
        this.steps = steps;
    }
}