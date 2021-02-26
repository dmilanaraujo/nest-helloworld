import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import {Role, RoleDocument} from "./schemas/role.schema";
import {Model} from "mongoose";
import {InjectModel} from '@nestjs/mongoose';
import {ActionsService} from "./actions.service";

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
        private readonly actionsService: ActionsService,
    ) {}

    create(createRoleInput: CreateRoleInput) {
      try {
          const createdRole = new this.roleModel(createRoleInput);
          return createdRole.save();
      } catch (e) {
          throw new Error(`Error in Repository to add role: ${e}`);
      }
  }

  async findAll(where: any) {
      try {
          return this.roleModel.find(where).exec();
      } catch (e) {
          throw new Error(`Error in Service to get roles: ${e}`);
      }
  }

  findOne(id: string) {
      try{
          return this.roleModel.findById(id).exec();
      } catch (e) {
          throw new Error(`Error in Service to find role: ${e}`);
      }
  }

  async update(_id: string, updateRoleInput: UpdateRoleInput) {
      try {
          return this.roleModel.findByIdAndUpdate(_id, {...updateRoleInput}).exec();
      } catch (e) {
          throw new Error(`Error in Service to update roles: ${e}`);
      }
  }

  async remove(_id: string) {
      try {
          const result = await this.roleModel.deleteOne({_id}).exec();
          return result.deletedCount == 1;
      } catch (e) {
          throw new Error(`Error in Service to delete role: ${e}`);
      }
  }


    async assignRolActions(roleId: string, actionsName: string[]) {
        try {
            const role = await this.roleModel.findById(roleId).exec();
            if (role) {
                const actions = await this.actionsService.findAll({ name: { $in: actionsName }});
                if(actions.length > 0) {
                    role.actions = actions;
                    return role.save();
                }
            }
            throw new Error(`Not found role or actions`);
        } catch (e) {
            throw new Error(`Error in Service to assignRolActions : ${e}`);
        }
    }

    async getActionsByRoles(roles: Role[]) {
        if (roles.length == 0) return [];
        try {
            const actionIds = roles.flatMap((role: Role) => role.actions || []);
            if (actionIds.length > 0) {
                return this.actionsService.findAll({ _id: { $in: actionIds }});
            }
            return [];
        } catch (e) {
            throw new Error(`Error in Service to getActionsByRoles : ${e}`);
        }
    }

    async hasPermission(roleIds: Role[], actionName: string) {
        const roles = await this.findAll({ _id: { $in: roleIds }});
        if (roles.some(role => role.name == 'Admin')) {
            return true;
        }
        const actions = await this.getActionsByRoles(roles);
        return actions.some(action => action.name === actionName);
    }

}
