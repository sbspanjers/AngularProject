import { TestBed } from '@angular/core/testing';
import { url } from 'inspector';

import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(url).toBe('https://mealtoeat-api.up.railway.app/api/data-api/recipe');
  });
});
