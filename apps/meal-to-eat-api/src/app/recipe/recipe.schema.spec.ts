import { Test } from '@nestjs/testing';
import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { validate, version } from 'uuid';

import { Recipe, RecipeDocument, RecipeSchema } from './recipe.schema';
import { User, UserDocument, UserSchema } from '../user/user.schema';

describe('Recipe Schema', () => {
    let mongod: MongoMemoryServer;
    let recipeModel: Model<RecipeDocument>;
    let userModel: Model<UserDocument>;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongod = await MongoMemoryServer.create();
                        const uri = mongod.getUri();
                        return {uri};
                    },
                }),
                MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
                MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
            ],
        }).compile();

        recipeModel = app.get<Model<RecipeDocument>>(getModelToken(Recipe.name));
        userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

        await recipeModel.ensureIndexes();
        await userModel.ensureIndexes();
    });

    afterAll(async () => {
        await disconnect();
        await mongod.stop();
    });

    it('uuid v4 as id', () => {
        const recipe = new recipeModel();

        expect(validate(recipe.id)).toBeTruthy();
        expect(version(recipe.id)).toBe(4);
    });

    it('name is required', () => {	
        const recipe = new recipeModel();
        const err = recipe.validateSync();
        
        expect(err!.errors!["name"]).toBeInstanceOf(Error);
    });

    it('has a creator', () => {
        const creator = { id: '123', name: 'test', emailAddress: 'test@mail.com', favRecipes: [] } as User;
        const testCreator = new userModel(creator);
        const recipe = { name: 'testrecipe', creator: testCreator};
        const testRecipe = new recipeModel(recipe);

        expect(testRecipe.creator).toBeDefined();
        expect(testRecipe.creator).toBe(testCreator);
    });
});