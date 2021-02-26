import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import {Role, RoleSchema} from "./schemas/role.schema";
import {MongooseModule} from '@nestjs/mongoose';
import {ActionsService} from "./actions.service";
import {Action, ActionsSchema} from "./schemas/actions.schema";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Role.name, schema: RoleSchema },
        { name: Action.name, schema: ActionsSchema }])
    ],
    providers: [RolesResolver, ActionsService, RolesService],
    exports:[MongooseModule, ActionsService, RolesService]
})
export class RolesModule {}
