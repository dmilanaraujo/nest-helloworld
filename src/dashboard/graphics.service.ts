import {  Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Graphic,
  GraphicDocument,
} from './schemas/graphic.schema';

@Injectable()
export class GraphicsService {
  constructor(
    @InjectModel(Graphic.name)
    private graphicModel: Model<GraphicDocument>,
  ) {}

  create(name: string) {
    try {
      const createdGraphic = new this.graphicModel({ name });
      return createdGraphic.save();
    } catch (e) {
      throw new Error(`Error in Repository to add graphic: ${e}`);
    }
  }

  async findAll(where: any) {
    try {
      return this.graphicModel.find(where).exec();
    } catch (e) {
      throw new Error(`Error in Service to get graphics: ${e}`);
    }
  }

  findOne(id: string) {
    try {
      return this.graphicModel.findById(id).exec();
    } catch (e) {
      throw new Error(`Error in Service to find graphic: ${e}`);
    }
  }

  findByName(name: string) {
    try {
      return this.graphicModel.findOne({name}).exec();
    } catch (e) {
      throw new Error(`Error in Service to find graphic: ${e}`);
    }
  }

  async update(_id: string, name: string) {
    try {
      return this.graphicModel.findByIdAndUpdate(_id, { name }).exec();
    } catch (e) {
      throw new Error(`Error in Service to update graphics: ${e}`);
    }
  }

  async remove(_id: string) {
    try {
      const result = await this.graphicModel.deleteOne({ _id }).exec();
      return result.deletedCount == 1;
    } catch (e) {
      throw new Error(`Error in Service to delete graphic: ${e}`);
    }
  }

}
