import {ArgsType, PartialType} from '@nestjs/graphql';
import {BasePaginationInput} from "./base-pagination.input";

@ArgsType()
export abstract class BasePaginationArgs extends PartialType(BasePaginationInput){}
