import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParksService } from './parks.service';
import { CreateParkInput } from './dto/create-park.input';
import { UpdateParkInput } from './dto/update-park.input';
import {Park} from "./schemas/park.schema";

@Resolver(() => Park)
export class ParksResolver {
  constructor(private readonly parksService: ParksService) {}

  @Mutation(() => Park)
  createPark(@Args('createParkInput') createParkInput: CreateParkInput) {
    return this.parksService.create(createParkInput);
  }

  @Query(() => [Park], { name: 'parks' })
  findAll() {
    return this.parksService.findAll();
  }

  @Query(() => Park, { name: 'park' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parksService.findOne(id);
  }

  @Mutation(() => Park)
  updatePark(@Args('updateParkInput') updateParkInput: UpdateParkInput) {
    return this.parksService.update(updateParkInput.id, updateParkInput);
  }

  @Mutation(() => Park)
  removePark(@Args('id', { type: () => Int }) id: number) {
    return this.parksService.remove(id);
  }
}
