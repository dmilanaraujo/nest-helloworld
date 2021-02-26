import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TracesService } from './traces.service';
import { CreateTraceInput } from './dto/create-trace.input';
import { UpdateTraceInput } from './dto/update-trace.input';
import { Trace } from './schemas/trace.schema';
import { FilterTraceInput } from '../traces/dto/filter-trace.input';
import { PaginatedTracesResponse } from '../traces/dto/paginated-traces-response';
import { PaginationTracesInput } from '../traces/dto/pagination-traces.input';

@Resolver(() => Trace)
export class TracesResolver {
  constructor(private readonly tracesService: TracesService) {}

  @Mutation(() => Trace)
  createTrace(@Args('createTraceInput') createTraceInput: CreateTraceInput) {
    return this.tracesService.create(createTraceInput);
  }

  @Query(() => [Trace], { name: 'traces' })
  findAll() {
    return this.tracesService.findAll();
  }

  @Query(() => Trace, { name: 'trace' })
  findOne(@Args('id') id: string) {
    return this.tracesService.findOne(id);
  }

  @Mutation(() => Trace)
  updateTrace(@Args('updateTraceInput') updateTraceInput: UpdateTraceInput) {
    return this.tracesService.update(updateTraceInput.id, updateTraceInput);
  }

  @Query(() => String, { name: 'traces_export' })
  export(
    @Args('filters', { nullable: true }) filters?: FilterTraceInput,
    @Args('format', { defaultValue: 'pdf' }) format?: string,
  ) {
    return this.tracesService.exportAll(filters, format);
  }

  @Query(() => PaginatedTracesResponse, { name: 'traces_paginate' })
  findAllPaginate(
    @Args('filters', { nullable: true }) filters?: FilterTraceInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationTracesInput,
  ) {
    return this.tracesService.findAllPaginate(filters, pagination);
  }

  @Mutation(() => Trace)
  removeTrace(@Args('id') id: string) {
    return this.tracesService.remove(id);
  }
}
