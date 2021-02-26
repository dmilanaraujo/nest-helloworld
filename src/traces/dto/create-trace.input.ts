import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTraceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
