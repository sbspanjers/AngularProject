import { Test } from '@nestjs/testing';

import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect, Model } from 'mongoose';
import { MongoClient } from 'mongodb';

import { User, UserDocument, UserSchema } from '../user/user.schema';
import { RecipeService } from './recipe.service';
import { Recipe, RecipeDocument, RecipeSchema } from './recipe.schema';
import { Ingredient, IngredientSchema } from '../ingredient/ingredient.schema';
import { Step, StepSchema } from '../step/step.schema';

describe('RecipeService', () => {
    let service: RecipeService;
    let mongod: MongoMemoryServer;
    let mongoc: MongoClient;
    let recipeModel: Model<RecipeDocument>;
    let userModel: Model<UserDocument>;

    const testIngredient = { name: 'test', amount: 0, weightMeasure: 'test' } as Ingredient;
    const testStep = { explanation: 'test' } as Step;
    const testUser = { id: '1', name: 'test', emailAddress: 'test@mail.com', favRecipes: [] } as User;

    const testRecipes = [{
        id: '1',
        name: 'Test',
        createDate: new Date(),
        imgUrl: 'https://www.google.com',
        personCount: 1,
        cookingTime: 1,
        kcal: 1,
        typeMeal: 'Test',
        ingredients: [testIngredient],
        steps: [testStep],
        creator: testUser,
    }, {
        id: '2',
        name: 'Test2',
        createDate: new Date(),
        imgUrl: 'https://www.google.com',
        personCount: 1,
        cookingTime: 1,
        kcal: 1,
        typeMeal: 'Test',
        ingredients: [testIngredient],
        steps: [testStep],
        creator: testUser,
    }];

    beforeAll(async () => {
        let uri = '';

        const app = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongod = await MongoMemoryServer.create();
                        uri = mongod.getUri();
                        return {uri};
                    }
                }),
                MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
                MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
                MongooseModule.forFeature([{ name: Ingredient.name, schema: IngredientSchema }]),
                MongooseModule.forFeature([{ name: Step.name, schema: StepSchema }]),

            ],
            providers: [RecipeService],
        }).compile();

        service = app.get<RecipeService>(RecipeService);
        recipeModel = app.get<Model<RecipeDocument>>(getModelToken(Recipe.name));
        userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

        mongoc = new MongoClient(uri);
        await mongoc.connect();      
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('recipes').deleteMany({});
        await mongoc.db('test').collection('users').deleteMany({});

        const testUser1 = new userModel(testUser);

        await Promise.all([testUser1.save()]);

        testRecipes[0].creator = testUser1;
        testRecipes[1].creator = testUser1;

        const recipe1 = new recipeModel(testRecipes[0]);
        const recipe2 = new recipeModel(testRecipes[1]);

        await Promise.all([recipe1.save(), recipe2.save()]);
    });

    afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
    });

    describe('getRecipes', () => {
        it('should return an array of recipes', async () => {
            const result = await service.getAllRecipes();
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual(testRecipes[0].name);
        });

        it('recipe has name, imgUrl and kcal', async () => {
            const result = await service.getAllRecipes();

            expect(result[1].name).toBeDefined();
            expect(result[1].imgUrl).toBeDefined();
            expect(result[1].kcal).toBeDefined();
        });
    });

    describe('get one recipe', () => {
        it('should return one recipe', async () => {
            const result = await service.getOne('1');
            expect(result).toBeDefined();
            expect(result.name).toEqual(testRecipes[0].name);
            expect(result.id).toEqual(testRecipes[0].id);
        });

        it('not found', async () => {
            const result = await service.getOne('3');

            expect(result).toBeUndefined();
        });
    });
});