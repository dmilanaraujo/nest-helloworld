import { ExecutionContext, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Action,
  ActionDocument,
} from './schemas/actions.schema';
import {ACTION_NAME} from '../auth/constants';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action.name)
    private actionModel: Model<ActionDocument>,
    private reflector: Reflector,
  ) {}

  create(name: string) {
    try {
      const createdAction = new this.actionModel({ name });
      return createdAction.save();
    } catch (e) {
      throw new Error(`Error in Repository to add action: ${e}`);
    }
  }

  async findAll(where: any) {
    try {
      return this.actionModel.find(where).exec();
    } catch (e) {
      throw new Error(`Error in Service to get actions: ${e}`);
    }
  }

  findOne(id: string) {
    try {
      return this.actionModel.findById(id).exec();
    } catch (e) {
      throw new Error(`Error in Service to find action: ${e}`);
    }
  }

  findByName(name: string) {
    try {
      return this.actionModel.findOne({name}).exec();
    } catch (e) {
      throw new Error(`Error in Service to find action: ${e}`);
    }
  }

  async update(_id: string, name: string) {
    try {
      return this.actionModel.findByIdAndUpdate(_id, { name }).exec();
    } catch (e) {
      throw new Error(`Error in Service to update actions: ${e}`);
    }
  }

  async remove(_id: string) {
    try {
      const result = await this.actionModel.deleteOne({ _id }).exec();
      return result.deletedCount == 1;
    } catch (e) {
      throw new Error(`Error in Service to delete action: ${e}`);
    }
  }

  async test(app) {
      const action = await this.actionModel.exists({name: 'Export_Users'});
      // console.log(action);
      if (!action) {
          // console.log('--entra create');
          await this.create('Export_Users');
      }
      // console.log(app);
      // console.log('--------------app.contextModule..container.modules-----------------------');
      // console.log(app.contextModule.container.modules);
      // app.contextModule.container.modules.forEach((module, key) =>{
      //    console.log('--key--' + key);
      //    // console.log(module);
      //    // console.log('------------');
      //    // console.log(module.providers);
      //     module.providers.forEach((m, key1) => {
      //         if (key1 == 'UsersModule')  {
      //             console.log('--key1 = ' + key1);
      //             console.log(m);
      //             const actionName = this.reflector.getAllAndOverride<string>(
      //                 FUNCTIONALITY_NAME,
      //                 [ m.metatype],
      //             );
      //             // console.log(actionName);
      //             // const actionName1 = this.reflector.getAllAndOverride<string>(
      //             //     FUNCTIONALITY_NAME,
      //             //     [m.metatype.getClass()],
      //             // );
      //             const actionName2 = this.reflector.getAllAndOverride<string>(
      //                 FUNCTIONALITY_NAME,
      //                 [m.metatype.getHandler()],
      //             );
      //             console.log(actionName2);
      //             // console.log('---metatype');
      //             // console.log(m.metatype);
      //         }
      //
      //     })
      //
      // });
      // console.log('--------------app.contextModule..container.dynamicModulesMetadata-----------------------');
      // console.log(app.contextModule.container.dynamicModulesMetadata);
      // console.log('--------------app.container.modules-----------------------');
      // console.log(app.container.modules);
      // console.log('dentro de action service');
  }
  register(context: ExecutionContext) {
      const actionName = this.reflector.getAllAndOverride<string>(
          ACTION_NAME,
          [context.getHandler(), context.getClass()],
      );
    if (actionName) {
      console.log('--actionName--');
      console.log(actionName);
        const action = this.actionModel.exists({name: actionName});
        if (!action) {
            this.create(actionName);
        }
    }
  }
}
