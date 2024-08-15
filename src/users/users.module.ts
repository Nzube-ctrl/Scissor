import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserDocument } from 'src/schemas/user.schema';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
  imports: [AuthModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class UsersModule { }
