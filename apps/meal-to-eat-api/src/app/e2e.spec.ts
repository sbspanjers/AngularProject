import request = require('supertest');

import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, MiddlewareConsumer, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';


import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from "mongodb-memory-server";
import { disconnect } from "mongoose";

import { AuthModule } from './auth/auth.module';
import { DataModule } from './data.module';
import { TokenMiddleware } from './auth/token.middleware';
import { UserRegistration } from '@MealToEat/data';
import { Neo4jModule } from './neo4j/neo4j.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv')

let mongod: MongoMemoryServer;
let uri: string;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
                return { uri };
            },
        }),
        Neo4jModule.forRoot({
            scheme: 'neo4j+s',
            host: process.env['NEO4J_HOST'] || '',
            username: process.env['NEO4J_USR'] || '',
            password: process.env['NEO4J_PWD'] || '',
            database: process.env['NEO4J_DB'] || '',
        }),
        AuthModule,
        DataModule,
        RouterModule.register([{
            path: 'auth-api',
            module: AuthModule,
        }, {
            path: 'data-api',
            module: DataModule,
        }]),
    ],
    controllers: [],
    providers: [],
})
export class TestAppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TokenMiddleware)
            .forRoutes('data-api')
    }
}
describe('MealToEat e2e test', () => {

    let server;
    let app: INestApplication;
    let module: TestingModule;
    let mongoc: MongoClient;


    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TestAppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        mongoc = new MongoClient(uri);
        await mongoc.connect();

        server = app.getHttpServer();
    })

    beforeEach(async () => {
        await mongoc.db('test').collection('identities').deleteMany({});
        await mongoc.db('test').collection('users').deleteMany({});
        await mongoc.db('test').collection('recipes').deleteMany({});
    });

    afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
    });

    it('a user registers, logs in, and gets his own info', async () => {
        const credentials: UserRegistration
            = {
            username: 'john',
            password: 'password',
            emailAddress: 'johndoe123@mail.com',
        }
        
        const register = await request(server)
            .post('/auth/register')
            .send(credentials)

        expect(register.status).toBe(201);
        expect(register.body.id).toBeDefined();

        const login = await request(server)
            .post('/auth/login')
            .send({
                emailAddress: credentials.emailAddress,
                password: credentials.password
            })

        expect(login.status).toBe(201);
        expect(login.body.token).toBeDefined();

        const token = login.body.token;

        const getSelf = await request(server)
            .get('/data/user/loggedUser')
            .set('Authorization', `${token}`)
        console.log(getSelf.body);

        expect(getSelf.status).toBe(200);
    })
})