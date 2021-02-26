import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type ActionDocument = Action & Document;

@ObjectType()
@Schema()
export class Action {

    @Field()
    id: string;

    @Prop({unique: true})
    @Field()
    name: string;

    @Prop()
    @Field()
    description: string;

}

export const ActionsSchema = SchemaFactory.createForClass(Action);
