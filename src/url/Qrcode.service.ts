import { Injectable, BadRequestException } from '@nestjs/common';
import * as QrCode from 'qrcode';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from 'src/schemas/url.schema';

@Injectable()
export class QRCodeService {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) { }

  async generateQrCode(shortUrl: string, request: any): Promise<string> {
    const userId = request.user; // Extract user ID from request
    // console.log('User ID:', userId); 
    // Validate that the short URL exists in the database
    const urlRecord = await this.urlModel.findOne({ shortUrl, user: userId });
    if (!urlRecord) {
      throw new BadRequestException(
        'Short URL does not exist or does not belong to the user',
      );
    }
    // Generate the QR code
    try {
      const qrCodeUrl = await QrCode.toDataURL(shortUrl);
      urlRecord.QrCodeUrl = qrCodeUrl;
      await urlRecord.save();
      return qrCodeUrl;
    } catch (error) {
      throw new Error('Failed to generate QR code');
    }
  }
}
