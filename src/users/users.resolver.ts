import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/gql-current-user.decorator';
import { User } from './schemas/user.schema';
import { FilterUserInput } from './dto/filter-user.input';
import { Role } from '../roles/schemas/role.schema';
import { RolesService } from '../roles/roles.service';
import { PaginationUsersInput } from './dto/pagination-users.input';
import {PaginatedUsersResponse} from "./dto/paginated-users-response";
import {ActionDef} from "../auth/constants";
import {CheckActionGuard} from "../auth/check-action.guard";

@Resolver(() => User)
@UseGuards(CheckActionGuard)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  @Mutation(() => User)
  @ActionDef('Create_User')
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @ActionDef('FindAll_Users')
  @Query(() => [User], { name: 'users' })
  findAll(@Args('filters', { nullable: true }) filters?: FilterUserInput) {
    return this.usersService.findAll(filters);
  }

  @ActionDef('Export_Users')
  @Query(() => String, { name: 'users_export' })
  export(@Args('filters', { nullable: true }) filters?: FilterUserInput, @Args('format', { defaultValue: 'pdf'}) format?: string) {
    return this.usersService.exportAll(filters, format);
  }

  @ActionDef('FindAll_Users')
  @Query(() => PaginatedUsersResponse, { name: 'users_paginate' })
  findAllPaginate(
    @Args('filters', { nullable: true }) filters?: FilterUserInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationUsersInput,
  ) {
    return this.usersService.findAllPaginate(filters, pagination);
  }

  @ActionDef('FindOne_User')
  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'me' })
  getMe(@CurrentUser() user: User) {
    return this.usersService.findOneByUsername(user.username);
  }

  @ActionDef('Update_User')
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @ActionDef('AssignRol_User')
  @Mutation(() => User)
  assignUserRol(
    @Args('userId') userId: string,
    @Args('roleId') roleId: string,
  ) {
    return this.usersService.assignUserRol(userId, roleId);
  }

  @ActionDef('UnassignRol_User')
  @Mutation(() => User)
  unassignUserRol(
    @Args('userId') userId: string,
    @Args('roleId') roleId: string,
  ) {
    return this.usersService.unassignUserRol(userId, roleId);
  }

  @ResolveField('roles', (returns) => [Role])
  async roles(@Parent() user: User) {
    return this.rolesService.findAll({ _id: { $in: user.roles } });
  }
}
