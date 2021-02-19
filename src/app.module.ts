import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost/nest'),
      GraphQLModule.forRoot({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
      UsersModule,
      RolesModule,
      AuthModule,
  ],
  controllers: [AppController],
  providers: [
      AppService
  ],
})
export class AppModule {}
