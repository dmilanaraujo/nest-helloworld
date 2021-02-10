import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateCatDto} from "./dto/create-cat.dto";
import {CatsService} from "./cats.service";
import {Cat} from "./interfaces/cat.interface";

@Controller('cats')
export class CatsController {

    constructor(private catsService: CatsService) {}

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':name')
    async findByName(@Param('name') name: string): Promise<Cat> {
        return this.catsService.findByName(name);
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Put(':name')
    async update(@Param('name') name: string, @Body() createCatDto: CreateCatDto) {
        this.catsService.update(name, createCatDto);
    }

    @Delete(':name')
    async delete(@Param('name') name: string) {
        this.catsService.delete(name);
    }

}
