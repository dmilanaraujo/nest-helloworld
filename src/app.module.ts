import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { join } from 'path';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      GraphQLModule.forRoot({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
      CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
