import { TestBed } from '@angular/core/testing';
import { url } from 'inspector';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(url).toBe('https://mealtoeat-api.up.railway.app/api/data-api/user')
  });
});
