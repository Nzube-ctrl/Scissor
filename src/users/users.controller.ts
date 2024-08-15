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
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  async updateProfile(
    @Param('userId') userId: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    return this.usersService.updateProfile(userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getProfile(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async deleteProfile(@Param('userId') userId: string): Promise<string> {
    return this.usersService.deleteProfile(userId)
  }
}
