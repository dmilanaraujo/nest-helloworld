import { Field, InputType } from '@nestjs/graphql';
import {Min} from "class-validator";

@InputType()
export class UpdateCatInput {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    @Min(0)
    age: number;

    @Field({ nullable: true })
    breed: string;
}
