import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {Role} from "../roles/entities/role.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

  create(createUserInput: CreateUserInput) {
      try {
          return this.usersRepository.save(createUserInput);
      } catch (e) {
          throw new Error(`Error in Repository to add user: ${e}`);
      }
  }

  findAll() {
      try{
          return this.usersRepository.find();
      } catch (e) {
          throw new Error(`Error in Service to get cats: ${e}`);
      }
  }

  findOne(id: number) {
      try{
          return this.usersRepository.findOne(id);
      } catch (e) {
          throw new Error(`Error in Service to find cat: ${e}`);
      }

  }

  findOneByUsername(username: string) {
      try{
          return this.usersRepository.findOne({ where: { username }});
      } catch (e) {
          throw new Error(`Error in Service to find cat: ${e}`);
      }

  }

  async update(id: number, updateUserInput: UpdateUserInput) {
      try {
          const obj = await this.usersRepository.findOne({where: {id}});
          return this.usersRepository.save({
              ...obj, // existing fields
              ...updateUserInput, // updated fields
          });
      } catch (e) {
          throw new Error(`Error in Service to update cats: ${e}`);
      }
  }

  async remove(id: number) {
      try {
          const obj = await this.usersRepository.delete(id);
          return obj.affected === 1;
      } catch (e) {
          throw new Error(`Error in Service to delete cat: ${e}`);
      }
  }

  async assignUserRol(userId: number, roleId: number) {
      try {
          const user = await this.usersRepository.findOne({where: {id: userId}, relations: ['roles']});
          if (user) {
            const role = await this.rolesRepository.findOne({where: {id: roleId}});
              if(role) {
                  user.roles.push(role);
                  return this.usersRepository.save(user);
              }
          }
          throw new Error(`Not found user or role`);
      } catch (e) {
          throw new Error(`Error in Service to assignUserRol : ${e}`);
      }
  }

  async unassignUserRol(userId: number, roleId: number) {
      try {
          const user = await this.usersRepository.findOne({where: {id: userId}, relations: ['roles']});
          if (user) {
              const role = await this.rolesRepository.findOne({where: {id: roleId}});
              if(role) {
                  user.roles = user.roles.filter(value => value.id != role.id);
                  return this.usersRepository.save(user);
              }
          }
          throw new Error(`Not found user or role`);
      } catch (e) {
          throw new Error(`Error in Service to assignUserRol : ${e}`);
      }
  }
}
