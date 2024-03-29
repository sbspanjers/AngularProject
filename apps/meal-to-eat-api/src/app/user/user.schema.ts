import { Recipe } from '@MealToEat/data';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({default: uuid, index: true, type: String})
  id!: string;

  @Prop({
    required: true,
    type: String,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  emailAddress!: string;

  @Prop({default: [], 
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Recipe'
  })
  favRecipes!: Recipe[];
}

export const UserSchema = SchemaFactory.createForClass(User);