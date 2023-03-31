import { RouterModule } from '@nestjs/core';
import { Module, RequestMethod } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose'
import { DataModule } from './data.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from '../logger.middleware'
import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './auth/token.middleware';
import { Neo4jModule } from './neo4j/neo4j.module';

require('dotenv');

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env['MONGO_USR']}:${process.env['MONGO_PWD']}@cluster0.d1fcddn.mongodb.net/MealToEat`),
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: process.env['NEO4J_HOST'] || '',
      username: process.env['NEO4J_USR']  || '',
      password: process.env['NEO4J_PWD']  || '',
      database: process.env['NEO4J_DB']  || '',
    }),
    AuthModule,
    DataModule,
    RouterModule.register([
      {
        path: 'auth-api',
        module: AuthModule,
      },
      {
        path: 'data-api',
        module: DataModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('data-api');
    consumer.apply(LoggerMiddleware).forRoutes({path: '*', method: RequestMethod.ALL });
  }
}
