import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import {ACTION_NAME, IS_PUBLIC_KEY} from './constants';
import { Reflector } from '@nestjs/core';
import {UsersService} from "../users/users.service";
import {RolesService} from "../roles/roles.service";
import {ExecutionContextHost} from "@nestjs/core/helpers/execution-context-host";
import {AuthenticationError} from 'apollo-server-express';

@Injectable()
export class CheckActionGuard implements CanActivate{
  constructor(
    private reflector: Reflector,
    private readonly rolesService: RolesService,
  ) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      const user = ctx.getContext().req.user;
      if (user) {
          const actionName = this.reflector.getAllAndOverride<string>(
              ACTION_NAME,
              [context.getHandler(), context.getClass()],
          );
          if (actionName) {
              const hasPermission = await this.rolesService.hasPermission(user.roles, actionName);
              if (!hasPermission) {
                  throw new UnauthorizedException(`Not permission user = ${user.username}, roles = ${user.roles}, action = ${actionName}`);
              }
          }
      }
      return true;
  }

}
