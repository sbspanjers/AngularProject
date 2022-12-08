import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type IngredientDocument = Ingredient & Document;

@Schema()
export class Ingredient {

    @Prop({default: ' ', required: true})
    name: string;

    @Prop({default: 0, required: true})
    amount: number;

    @Prop({default: ' ', required: true})
    weightMeasure: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);