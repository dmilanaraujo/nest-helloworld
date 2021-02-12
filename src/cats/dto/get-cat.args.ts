import { Field, ArgsType } from '@nestjs/graphql';
import {Min, MinLength} from "class-validator";

@ArgsType()
export class GetCatArgs {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    @Min(1)
    age?: number;

    @Field({ nullable: true })
    @MinLength(3)
    breed?: string;
}
