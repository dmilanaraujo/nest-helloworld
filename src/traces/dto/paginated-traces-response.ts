import { ObjectType } from '@nestjs/graphql';
import {Paginated} from "../../shared/dto/base-paginated-response";
import {Trace} from "../schemas/trace.schema";

@ObjectType({description: 'Users List Output'})
export class PaginatedTracesResponse extends Paginated(Trace) {
  // Redefine here
}
