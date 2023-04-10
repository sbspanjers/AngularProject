import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.schema';
import { User } from '../user/user.schema';

describe('RecipeController', () => {
    let app: TestingModule;
    let recipeController: RecipeController;
    let recipeService: RecipeService;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [RecipeController],
            providers: [{
                    provide: RecipeService,
                    useValue: {
                        getAllRecipes: jest.fn(),
                        getOne: jest.fn(),
                    },
                }
            ],
        }).compile();

        recipeController = app.get<RecipeController>(RecipeController);
        recipeService = app.get<RecipeService>(RecipeService);
    })

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllRecipes', () => {
        it('should return array of recipes', async () => {
            const creator = { 
                id: 'testId',
                name: 'test',
                emailAddress: 'test@mail.com',
            } as User;

            const recipes = [
                {
                    id: 'id1',
                    name: 'recipe1',
                    createDate: new Date(),
                    imgUrl: 'imgUrl',
                    personCount: 1,
                    cookingTime: 1,
                    kcal: 1,
                    typeMeal: 'typeMeal',
                    steps: [],
                    ingredients: [],
                    creator: creator,
                } as Recipe,
                {
                    id: 'id2',
                    name: 'recipe2',
                    createDate: new Date(),
                    imgUrl: 'imgUrl',
                    personCount: 1,
                    cookingTime: 1,
                    kcal: 1,
                    typeMeal: 'typeMeal',
                    steps: [],
                    ingredients: [],
                    creator: creator,
                } as Recipe,
            ];
            
            const getAllRecipes = jest.spyOn(recipeService, 'getAllRecipes').mockImplementation(async () => recipes);
            const results = await recipeController.getAllRecipes();

            expect(getAllRecipes).toBeCalledTimes(1);
            expect(results).toHaveLength(2);
            expect(results[0]).toHaveProperty('id', recipes[0].id);
        });
    })

    describe('getRecipeById', () => {
        it('should return recipe with given id', async () => {
            const creator = { 
                id: 'testId',
                name: 'test',
                emailAddress: '',
            } as User;

            const recipes = [
                {
                    id: 'id1',
                    name: 'recipe1',
                    createDate: new Date(),
                    imgUrl: 'imgUrl',
                    personCount: 1,
                    cookingTime: 1,
                    kcal: 1,
                    typeMeal: 'typeMeal',
                    steps: [],
                    ingredients: [],
                    creator: creator,
                } as Recipe,
                {
                    id: 'id2',
                    name: 'recipe2',
                    createDate: new Date(),
                    imgUrl: 'imgUrl',
                    personCount: 1,
                    cookingTime: 1,
                    kcal: 1,
                    typeMeal: 'typeMeal',
                    steps: [],
                    ingredients: [],
                    creator: creator,
                } as Recipe,
            ];

            const getOne = jest.spyOn(recipeService, 'getOne').mockImplementation(async () => recipes[0]);
            const results = await recipeController.getOne('id1');

            expect(getOne).toBeCalledTimes(1);
            expect(results).toHaveLength(1);
            expect(results[0]).toHaveProperty('name', recipes[0].name);
        });

    });
});