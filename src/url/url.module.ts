import { Module, forwardRef } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from 'src/schemas/url.schema';
import { QRCodeService } from './Qrcode.service';
import { User } from 'src/schemas/user.schema';
// import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
  controllers: [UrlController],
  providers: [UrlService, QRCodeService],
  exports: [UrlService, QRCodeService],
})
export class UrlModule { }
