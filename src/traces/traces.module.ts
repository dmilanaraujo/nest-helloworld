import { Module } from '@nestjs/common';
import { TracesService } from './traces.service';
import { TracesResolver } from './traces.resolver';
import {MongooseModule} from '@nestjs/mongoose';
import {Trace, TraceSchema} from "./schemas/trace.schema";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Trace.name, schema: TraceSchema }])
    ],
    providers: [TracesResolver, TracesService],
    exports:[MongooseModule, TracesService]
})
export class TracesModule {}
