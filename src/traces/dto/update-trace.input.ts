import { CreateTraceInput } from './create-trace.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTraceInput extends PartialType(CreateTraceInput) {
  @Field()
  id: string;
}
