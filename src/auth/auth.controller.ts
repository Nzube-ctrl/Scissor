import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { LoginUserDto } from 'src/users/dto/login.user.dto';
import { User } from 'src/schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ message: string; user: Partial<User>, token: string }> {
        return this.authService.register(createUserDto)
    }

    @Post('login')
    async login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<{ message: string; user: Partial<User>; token: string }> {
        return this.authService.login(loginUserDto)
    }
}
