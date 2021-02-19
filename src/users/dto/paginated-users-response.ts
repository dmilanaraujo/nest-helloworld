import { ObjectType } from '@nestjs/graphql';
import {Paginated} from "../../shared/dto/base-paginated-response";
import {User} from "../schemas/user.schema";

@ObjectType({description: 'Users List Output'})
export class PaginatedUsersResponse extends Paginated(User) {
  // Redefine here
}
