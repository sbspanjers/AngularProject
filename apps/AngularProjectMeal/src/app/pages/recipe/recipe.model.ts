export class Recipe {
    id: number = 0;
    name: string = '';
    createDate: Date = new Date(Date.now());
    imgUrl: string = '';
    personCount: number = 0;
    cookingTime: number = 0;
    kcal: number = 0;
    typeMeal: string = '';

    constructor(name = '', createDate = new Date(Date.now()), imgUrl = '', personCount = 0, cookingTime = 0, kcal = 0, typeMeal = '') {
        this.name = name;
        this.createDate = createDate;
        this.imgUrl = imgUrl;
        this.personCount = personCount;
        this.cookingTime = cookingTime;
        this.kcal = kcal;
        this.typeMeal = typeMeal;
    }
}