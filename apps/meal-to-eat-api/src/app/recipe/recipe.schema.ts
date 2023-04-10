import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose';
import { StepSchema } from '../step/step.schema';
import { v4 as uuid } from 'uuid';
import { Step } from '../step/step.schema';
import { IngredientSchema } from '../ingredient/ingredient.schema';
import { Ingredient, User } from '@MealToEat/data';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
    @Prop({default: uuid, index: true, type: String})
    id!: string;

    @Prop({required: true, type: String})
    name!: string;

    @Prop({required: true, type: Date})
    createDate!: Date;

    @Prop({required: true, type: String})
    imgUrl!: string;

    @Prop({required: true, type: Number})
    personCount!: number;

    @Prop({required: true, type: Number})
    cookingTime!: number;

    @Prop({required: true, type: Number})
    kcal!: number;

    @Prop({required: true, type: String})
    typeMeal!: string;

    @Prop({default: [],
        type: [StepSchema],
    })
    steps!: Step[];

    @Prop({default: [],
        type: [IngredientSchema],
    })
    ingredients!: Ingredient[];

    @Prop({default: new User,
        type: MongooseSchema.Types.ObjectId,
        ref: 'User'
    })
    creator!: User;

}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);