import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type StepDocument = Step & Document;

@Schema()
export class Step {

    @Prop({default: 'Typ hier uw stap...', required: true})
    explanation: string;
}


export const StepSchema = SchemaFactory.createForClass(Step);