import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { LoginUserDto } from 'src/users/dto/login.user.dto';
import * as Bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) { }

    async register(
        createUserDto: CreateUserDto,
    ): Promise<{ message: string; user: Partial<User>, token: string }> {
        const existingUser = await this.userModel.findOne({
            email: createUserDto.email,
        });
        if (existingUser) {
            throw new UnauthorizedException('Email already in use');
        }

        const hashedPassword = await Bcrypt.hash(createUserDto.password, 10);
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });
        await newUser.save();
        const { password, ...userWithoutPassword } = newUser.toObject();
        const token = this.jwtService.sign({ id: newUser._id })
        return {
            message: 'User registered successfully!',
            user: userWithoutPassword,
            token
        };
    }


    async login(loginUserDto: LoginUserDto): Promise<{ message: string; user: Partial<User>; token: string }> {
        const user = await this.userModel.findOne({ email: loginUserDto.email });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await Bcrypt.compare(loginUserDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const { password, ...userWithoutPassword } = user.toObject();
        const token = this.jwtService.sign({ id: user._id });

        return {
            message: 'User logged in successfully',
            user: userWithoutPassword,
            token,
        };
    }
}
