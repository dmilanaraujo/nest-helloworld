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
import * as PDFDocument from 'pdfkit'
import * as Excel from 'exceljs';
import {Buffer as BufferExcel} from "exceljs";

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

  async exportAll(where?: FilterUserInput, format?: string) {
        if (format == 'pdf') {
            return this.exportPDF(where);
        } else {
            return this.exportExcel(where, format);
        }
  }
  async exportPDF(where?: FilterUserInput) {
      try {
          const items = await this.findAll(where);

          const pdfBuffer: Buffer = await new Promise(resolve => {
              const doc = new PDFDocument({
                  size: 'LETTER',
                  bufferPages: true,
              });

              // customize your PDF document
              items.forEach((item) => {
                  doc.text(`${item.username} ${item.email}`);
                  doc.moveDown();
              });
              doc.end();

              const buffer = [];
              doc.on('data', buffer.push.bind(buffer));
              doc.on('end', () => {
                  const data = Buffer.concat(buffer);
                  resolve(data)
              })
          });

          return pdfBuffer.toString('base64');
      } catch (e) {
          throw new Error(`Error in Service to export users : ${e}`);
      }
  }

  async exportExcel(where?: FilterUserInput, format: string = 'excel') {
      try {
        const items = await this.findAll(where);
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Users list');
          worksheet.columns = [
              {
                  header: 'Username',
                  key: 'username',
                  width: 10,
                  outlineLevel: 1,
                  hidden: false,
                  style: null,
                  values:null,
                  letter: 'a',
                  number: 1,
                  worksheet: null,
                  defn: null,
                  isCustomWidth: false,
                  isDefault: false,
                  headerCount: 1,
                  headers: [],
                  equivalentTo: null,
                  collapsed:false,
                  eachCell: null
              },
              {
                  header: 'Email',
                  key: 'email',
                  width: 20,
                  outlineLevel: 1,
                  hidden: false,
                  style: null,
                  values:null,
                  letter: 'b',
                  number: 1,
                  worksheet: null,
                  defn: null,
                  isCustomWidth: false,
                  isDefault: false,
                  headerCount: 1,
                  headers: [],
                  equivalentTo: null,
                  collapsed:false,
                  eachCell: null
              }
          ];
          items.forEach((data, index) => {
              worksheet.addRow(data);
          });
          let buffer: BufferExcel = null;
          if (format == 'excel') {
            buffer = await workbook.xlsx.writeBuffer();
          } else {
            buffer = await workbook.csv.writeBuffer();
          }
          // Buffer.concat(buffer).toString('base64');
          return buffer.toString();
      } catch (e) {
          throw new Error(`Error in Service to export users : ${e}`);
      }
  }
}
