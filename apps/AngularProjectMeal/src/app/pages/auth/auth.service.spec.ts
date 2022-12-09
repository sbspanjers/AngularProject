import { Test, TestingModule } from '@nestjs/testing';
import { compare } from 'bcrypt';
import { url } from 'inspector';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(url).toBe('https://mealtoeat-api.up.railway.app/api/auth-api');
  });
});
