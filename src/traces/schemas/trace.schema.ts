import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type TraceDocument = Trace & Document;

@ObjectType()
@Schema()
export class Trace {

    @Field()
    id: string;

    @Prop()
    @Field()
    email: string;

    @Prop()
    @Field()
    ip: string;

    @Prop()
    @Field()
    functionality: string;

    @Prop()
    @Field()
    status: string;

    @Prop()
    @Field()
    date: string;

}

export const TraceSchema = SchemaFactory.createForClass(Trace);
