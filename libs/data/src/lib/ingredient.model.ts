export class Ingredient {
    name = '';
    amount = 0;
    weightMeasure = '';

    constructor(name = '', amount = 0, weightMeasure = '') {
        this.name = name;
        this.amount = amount;
        this.weightMeasure = weightMeasure;
    }
}