import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import * as mongoose from "mongoose";
import {Action} from "./actions.schema";

export type RoleDocument = Role & Document;

@ObjectType()
@Schema()
export class Role {

    @Field()
    id: string;

    @Prop()
    @Field()
    name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Action' }] })
    @Field(() => [Action!]!,{nullable:true})
    actions: Action[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
