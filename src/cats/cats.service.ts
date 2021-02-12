import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {Cat} from "./cat.entity";
import {NewCatInput} from "./dto/new-cat.input";
import {UpdateCatInput} from "./dto/update-cat.input";
import {CatsPaginationArgs} from "./dto/cats-pagination.args";
import {CatsPaginatedResponse} from "./dto/cats-paginated-response";

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private catsRepository: Repository<Cat>,
    ) {}

    create(catInput: NewCatInput): Promise<Cat> {
        try {
            return this.catsRepository.save(catInput);
        } catch (e) {
            throw new Error(`Error in Repository to add cats: ${e}`);
        }
    }

    async update(id: number, catInput: UpdateCatInput): Promise<Cat> {
        try{
            const obj = await this.catsRepository.findOne({where: {id}});
            return this.catsRepository.save({
                ...obj, // existing fields
                ...catInput, // updated fields
            });
        } catch (e) {
            throw new Error(`Error in Service to update cats: ${e}`);
        }
    }

    async findAll(): Promise<Cat[]> {
        try{
            return this.catsRepository.find();
        } catch (e) {
            throw new Error(`Error in Service to get cats: ${e}`);
        }
    }

    async getAllPaginate(catsArgs: CatsPaginationArgs): Promise<CatsPaginatedResponse> {
        try {
            const filter: any = {take: catsArgs.pageSize, skip: catsArgs.pageNumber - 1, order: {id: 'ASC'}};
            const result = await this.catsRepository.findAndCount(filter);
            const items = result[0];
            const total = result[1];
            return {
                items,
                count: items.length,
                total,
            };
        } catch (e) {
            throw new Error(`Error in Repository to find all cats, with paginate: ${e}`);
        }
    };


    async findById(id: number): Promise<Cat> {
        try{
            return this.catsRepository.findOne(id);
        } catch (e) {
            throw new Error(`Error in Service to find cat: ${e}`);
        }
    }

    async delete(id: number): Promise<boolean> {
        try{
            // return this.catsRepository.delete(id);
            const obj = await this.catsRepository.delete(id);
            return obj.affected === 1;
        } catch (e) {
            throw new Error(`Error in Service to delete cat: ${e}`);
        }
    }
}
