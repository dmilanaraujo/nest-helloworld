import { CreateParkInput } from './create-park.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateParkInput extends PartialType(CreateParkInput) {
  @Field(() => Int)
  id: number;
}
