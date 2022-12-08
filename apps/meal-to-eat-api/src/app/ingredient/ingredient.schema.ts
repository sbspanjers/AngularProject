import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type IngredientDocument = Ingredient & Document;

@Schema()
export class Ingredient {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    amount: number;

    @Prop({required: true})
    weightMeasure: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);