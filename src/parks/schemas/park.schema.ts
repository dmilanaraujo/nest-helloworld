import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type ParkDocument = Park & Document;

@ObjectType()
@Schema()
export class Park {

    @Field()
    id: string;

    @Prop()
    @Field()
    name: string;

}

export const ParkSchema = SchemaFactory.createForClass(Park);
