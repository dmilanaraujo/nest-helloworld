import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type RoleDocument = Role & Document;

@ObjectType()
@Schema()
export class Role {

    @Field()
    id: string;

    @Prop()
    @Field()
    name: string;

}

export const RoleSchema = SchemaFactory.createForClass(Role);
