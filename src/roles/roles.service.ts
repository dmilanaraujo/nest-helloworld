import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {Role} from "./entities/role.entity";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    create(createRoleInput: CreateRoleInput) {
      try {
          return this.rolesRepository.save(createRoleInput);
      } catch (e) {
          throw new Error(`Error in Repository to add role: ${e}`);
      }
  }

  findAll(where: any) {
      try{
          return this.rolesRepository.find({ where });
      } catch (e) {
          throw new Error(`Error in Service to get roles: ${e}`);
      }
  }

  findOne(id: number) {
      try{
          return this.rolesRepository.findOne(id);
      } catch (e) {
          throw new Error(`Error in Service to find role: ${e}`);
      }
  }

  async update(id: number, updateRoleInput: UpdateRoleInput) {
      try {
          const obj = await this.rolesRepository.findOne({where: {id}});
          return this.rolesRepository.save({
              ...obj, // existing fields
              ...updateRoleInput, // updated fields
          });
      } catch (e) {
          throw new Error(`Error in Service to update roles: ${e}`);
      }
  }

  async remove(id: number) {
      try {
          const obj = await this.rolesRepository.delete(id);
          return obj.affected === 1;
      } catch (e) {
          throw new Error(`Error in Service to delete role: ${e}`);
      }
  }
}
