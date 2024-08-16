import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { LoginUserDto } from 'src/users/dto/login.user.dto';
import { User } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a user and return a token', async () => {
      const createUserDto: CreateUserDto = {
        username: 'Nzube123',
        email: 'Nzube@email.com',
        password: '@Nzube123',
      };
      const result = {
        message: 'User registered successfully',
        user: {
          id: '1',
          username: 'Nzube123',
          email: 'Nzube@email.com',
        } as Partial<User>,
        token: 'some-token',
      };

      jest.spyOn(authService, 'register').mockResolvedValue(result);

      expect(await controller.register(createUserDto)).toBe(result);
      expect(authService.register).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should log in a user and return a token', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'Nzube@email.com',
        password: '@Nzube123',
      };
      const result = {
        message: 'User logged in successfully',
        user: {
          id: '1',
          username: 'Nzube123',
          email: 'Nzube@email.com',
        } as Partial<User>,
        token: 'some-token',
      };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await controller.login(loginUserDto)).toBe(result);
      expect(authService.login).toHaveBeenCalledWith(loginUserDto);
    });
  });
});
