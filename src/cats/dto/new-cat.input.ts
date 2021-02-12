import { Field, InputType } from '@nestjs/graphql';
import {Min} from "class-validator";

@InputType()
export class NewCatInput {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    @Min(0)
    age: number;

    @Field({ nullable: true })
    breed: string;
}
