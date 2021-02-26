import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import {MongooseModule} from '@nestjs/mongoose';
import { ParksModule } from './parks/parks.module';
import { TracesModule } from './traces/traces.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost/nest'),
      GraphQLModule.forRoot({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
      UsersModule,
      RolesModule,
      AuthModule,
      ParksModule,
      TracesModule,
      DashboardModule,
      CaslModule,
  ],
  controllers: [AppController],
  providers: [
      AppService
  ],
})
export class AppModule {}
