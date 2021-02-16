import { ObjectType } from '@nestjs/graphql';
import {Cat} from "../entities/cat.entity";
import {Paginated} from "../../shared/dto/base-paginated-response";

@ObjectType({description: 'Cats List Output'})
export class CatsPaginatedResponse extends Paginated(Cat) {
  // Redefine here
}
