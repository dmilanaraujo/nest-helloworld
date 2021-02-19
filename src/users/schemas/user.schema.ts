import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import {Role} from "../../roles/schemas/role.schema";
import * as mongoose from "mongoose";

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
    @Field()
    id: string;

    @Prop()
    @Field()
    username: string;

    @Prop()
    @Field()
    password: string;

    @Prop()
    @Field()
    email: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
    @Field(() => [Role!]!,{nullable:true})
    roles: Role[];
}
export const UserSchema = SchemaFactory.createForClass(User);
