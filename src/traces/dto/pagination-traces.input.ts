// import {ArgsType} from 'type-graphql';
import {InputType, PartialType} from '@nestjs/graphql';
import {BasePaginationInput} from "../../shared/dto/base-pagination.input";

@InputType()
export class PaginationTracesInput extends PartialType(BasePaginationInput) {

}
