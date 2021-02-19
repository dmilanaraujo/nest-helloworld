import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import {Role, RoleSchema} from "./schemas/role.schema";
import {MongooseModule} from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
    providers: [RolesResolver, RolesService],
    exports:[MongooseModule, RolesService]
})
export class RolesModule {}
