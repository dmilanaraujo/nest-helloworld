import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import {RolesModule} from "../roles/roles.module";
import {User, UserSchema} from "./schemas/user.schema";
import {MongooseModule} from '@nestjs/mongoose';

@Module({
    imports: [RolesModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]) ],
    providers: [UsersResolver, UsersService],
    exports: [UsersService]
})
export class UsersModule {}
