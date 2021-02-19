import {InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class BasePaginationInput {
  @Field(type => Int)
  limit = 20;

  @Field(type => Int)
  skip = 0;

  @Field({nullable: true})
  keywords?: string;

  @Field({ nullable: true })
  sort?: string = "-id";
}
