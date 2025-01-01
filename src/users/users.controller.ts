import { Controller } from '@nestjs/common';
import {
  Body,
  Param,
  Put,
  Delete,
  Get,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from 'src/schemas/user.schema';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Put(':userId')
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    return this.usersService.updateProfile(userId, updateUserDto);
  }

  @Get(':userId')
  async getProfile(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findById(userId);
  }

  @Delete(':userId')
  async deleteProfile(@Param('userId') userId: string): Promise<string> {
    return this.usersService.deleteProfile(userId)
  }
}
