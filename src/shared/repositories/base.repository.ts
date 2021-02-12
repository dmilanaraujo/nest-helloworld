import {Repository} from 'typeorm';

export abstract class BaseRepository<T> extends Repository<T> {
  getAll = async () => {
    try {
      return await this.find();
    } catch (e) {
      throw new Error(`Error in Find all: ${e}`);
    }
  };
}
