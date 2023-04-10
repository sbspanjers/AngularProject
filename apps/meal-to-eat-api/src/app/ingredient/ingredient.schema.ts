import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type IngredientDocument = Ingredient & Document;

@Schema()
export class Ingredient {

    @Prop({default: ' ', required: true, type: String})
    name!: string;

    @Prop({default: 0, required: true, type: Number})
    amount!: number;

    @Prop({default: ' ', required: true, type: String})
    weightMeasure!: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);