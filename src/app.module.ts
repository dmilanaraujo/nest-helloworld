import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { join } from 'path';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      GraphQLModule.forRoot({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
      CatsModule,
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
