import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from 'src/schemas/user.schema';
import { ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

describe('UsersController', () => {
  let controller: UsersController;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
