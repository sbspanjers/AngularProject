import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type StepDocument = Step & Document;

@Schema()
export class Step {

    @Prop({default: 'Typ hier uw uitleg..', required: true, type: String})
    explanation!: string;
}


export const StepSchema = SchemaFactory.createForClass(Step);