import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import {Role, RoleDocument} from "./schemas/role.schema";
import {Model} from "mongoose";
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

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
}
