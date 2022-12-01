import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { v4 as uuid } from 'uuid';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
    @Prop({default: uuid, index: true})
    id: string;

    @Prop({required: true, unique: true})
    name: string;

}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);