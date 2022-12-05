import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { v4 as uuid } from 'uuid';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
    @Prop({default: uuid, index: true})
    id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    createDate: Date;

    @Prop({required: true})
    imgUrl: string;

    @Prop({required: true})
    personCount: number;

    @Prop({required: true})
    cookingTime: number;

    @Prop({required: true})
    kcal: number;

    @Prop({required: true})
    typeMeal: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);