import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update.user.dto';
import { User , UserDocument} from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async updateProfile(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    const user = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, {
        new: true,
      })
      .exec();
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    Object.assign(user, updateUserDto);
    await user.save();
    return { message: 'User details updated successfully', user };
  }

  async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async deleteProfile(userId: string): Promise<string> {
    const user = await this.userModel.findByIdAndDelete(userId).exec();
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return `User Profile deleted successfully`;
  }
}
