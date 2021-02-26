import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import {CreateTraceInput} from "./create-trace.input";

@InputType()
export class FilterTraceInput extends PartialType(CreateTraceInput) {}
