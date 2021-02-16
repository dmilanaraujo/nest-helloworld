import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import {User} from "./entities/user.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolesModule} from "../roles/roles.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), RolesModule],
    providers: [UsersResolver, UsersService],
    exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}
