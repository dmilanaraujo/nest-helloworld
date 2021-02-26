import { Module } from '@nestjs/common';
import { ParksService } from './parks.service';
import { ParksResolver } from './parks.resolver';
import {Park, ParkSchema} from "./schemas/park.schema";
import {MongooseModule} from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Park.name, schema: ParkSchema }])
    ],
    providers: [ParksResolver, ParksService],
    exports:[MongooseModule, ParksService]
})
export class ParksModule {}
