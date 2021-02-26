import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardResolver } from './dashboard.resolver';
import {MongooseModule} from '@nestjs/mongoose';
import {Dashboard, DashboardSchema} from "./schemas/dashboard.schema";
import {Graphic, GraphicSchema} from "./schemas/graphic.schema";
import {GraphicsService} from "./graphics.service";

@Module({

    imports: [MongooseModule.forFeature([
        { name: Dashboard.name, schema: DashboardSchema },
        { name: Graphic.name, schema: GraphicSchema }])
    ],
    providers: [DashboardResolver, GraphicsService, DashboardService],
    exports:[MongooseModule, GraphicsService, DashboardService]
})
export class DashboardModule {}
