import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateParkInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
