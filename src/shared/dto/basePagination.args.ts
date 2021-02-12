import {Max, Min} from 'class-validator';
// import {ArgsType, Field, Int} from 'type-graphql';
import {ArgsType, Field, Int} from '@nestjs/graphql';


@ArgsType()
export abstract class BasePaginationArgs {
  @Field(type => Int)
  pageSize = 10; // take

  @Field(type => Int)
  pageNumber = 0; // skip

  @Field({nullable: true})
  keywords?: string;

  // @Field({ nullable: true })
  // sort?: string;
}
