
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function Paginated<T>(classRef: Type<T>): any {

    @ObjectType({ isAbstract: true })
    abstract class PaginatedType {

        @Field(type => [classRef], { nullable: true })
            // and here the generic type
        items: T[];

        @Field(type => Int)
        // total of elements
        total: number;

        @Field()
        // count element returned
        count: number;
    }
    return PaginatedType;
}
