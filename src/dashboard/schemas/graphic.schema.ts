import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type GraphicDocument = Graphic & Document;

@ObjectType()
@Schema()
export class Graphic {

    @Field()
    id: string;

    @Prop()
    @Field()
    name: string;

}

export const GraphicSchema = SchemaFactory.createForClass(Graphic);
