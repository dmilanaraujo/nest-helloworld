import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import * as mongoose from "mongoose";
import {Graphic} from "./graphic.schema";

export type DashboardDocument = Dashboard & Document;

@ObjectType()
@Schema()
export class Dashboard {

    @Field()
    id: string;

    @Prop()
    @Field()
    name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Graphic' }] })
    @Field(() => [Graphic!]!,{nullable:true})
    roles: Graphic[];
}

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
