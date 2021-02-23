import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../auth/gql-auth.guard";
import {SkipAuth} from "../auth/constants";
import {Role} from "./schemas/role.schema";

@UseGuards(GqlAuthGuard)
@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  // @SkipAuth()//todo probando decorator para ignorar autenticacion requerida (OK)
  @Query(() => [Role], { name: 'roles' })
  findAll() {
    return this.rolesService.findAll({});
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.rolesService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation(() => Boolean)
  removeRole(@Args('id') id: string) {
    return this.rolesService.remove(id);
  }
}
