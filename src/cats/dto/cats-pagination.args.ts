// import {ArgsType} from 'type-graphql';
import {ArgsType} from '@nestjs/graphql';
import {BasePaginationArgs} from '../../shared/dto/basePagination.args';

@ArgsType()
export class CatsPaginationArgs extends BasePaginationArgs {
  // Redefine here
}
