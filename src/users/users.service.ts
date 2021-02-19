import {Injectable} from '@nestjs/common';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {Model} from "mongoose";
import {Role, RoleDocument} from "../roles/schemas/role.schema";
import {User, UserDocument} from "./schemas/user.schema";
import {InjectModel} from '@nestjs/mongoose';
import {FilterUserInput} from "./dto/filter-user.input";
import {PaginationUsersInput} from "./dto/pagination-users.input";
import {PaginatedUsersResponse} from "./dto/paginated-users-response";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>
    ) {}

  create(createUserInput: CreateUserInput) {
      try {
          const createdUser = new this.userModel(createUserInput);
          return createdUser.save();
      } catch (e) {
          throw new Error(`Error in Repository to add user: ${e}`);
      }
  }

  async findAll(where?: FilterUserInput) {
      try {
          return this.userModel.find(where).exec();
      } catch (e) {
          throw new Error(`Error in Service to get users: ${e}`);
      }
  }

  async findAllPaginate(where?: FilterUserInput, pagination?: PaginationUsersInput): Promise<PaginatedUsersResponse> {
      try {
          const total = await this.userModel.find(where).countDocuments();
          const items = await this.userModel
              .find(where)
              .limit(pagination.limit || -1)
              .skip(pagination.skip || 0)
              .sort(pagination.sort)
              .exec();
          return {
              items,
              count: items.length,
              total,
          };
      } catch (e) {
          throw new Error(`Error in Service to get users: ${e}`);
      }
  }

  findOne(id: string) {
      try{
          return this.userModel.findById(id).exec();
      } catch (e) {
          throw new Error(`Error in Service to find user: ${e}`);
      }
  }

  findOneByUsername(username: string) {
      try{
          return this.userModel.findOne({username}).exec();
      } catch (e) {
          throw new Error(`Error in Service to find user: ${e}`);
      }
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
      try {
          return  this.userModel.findByIdAndUpdate(id, {...updateUserInput}).exec();
      } catch (e) {
          throw new Error(`Error in Service to update users: ${e}`);
      }
  }

  async remove(_id: string) {
      try {
          const result = await this.userModel.deleteOne({_id}).exec();
          return result.deletedCount == 1;
      } catch (e) {
          throw new Error(`Error in Service to delete user: ${e}`);
      }
  }

  async assignUserRol(userId: string, roleId: string) {
      try {
          const user = await this.userModel.findById(userId).exec();
          if (user) {
              const role = await this.roleModel.findById(roleId).exec();
              if(role) {
                  if (!user.roles.includes(role.id))  {
                      user.roles.push(role);
                      return user.save();
                  }
                  throw new Error(`User contains this Role`);
              }
          }
          throw new Error(`Not found user or role`);
      } catch (e) {
          throw new Error(`Error in Service to assignUserRol : ${e}`);
      }
  }

  async unassignUserRol(userId: string, roleId: string) {
      try {
          const user = await this.userModel.findById(userId).exec();
          if (user) {
              const role = await this.roleModel.findById(roleId).exec();
              if(role) {
                  user.roles = user.roles.filter(value => value != role.id);
                  return user.save();
              }
          }
          throw new Error(`Not found user or role`);
      } catch (e) {
          throw new Error(`Error in Service to assignUserRol : ${e}`);
      }
  }
}
