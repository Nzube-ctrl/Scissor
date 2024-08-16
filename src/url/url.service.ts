import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from 'src/schemas/url.schema';
import { Model } from 'mongoose';
import { ShortenUrlDto } from './dto/shorten.url.dto';
import { randomBytes } from 'crypto';
import { QRCodeService } from './Qrcode.service';
import { CustomizeShortUrlDto } from './dto/customize.dto';

//function to generate shortUrl
function generateShortUrl(length: number): string {
  return randomBytes(length).toString('base64url').slice(0, length);
}

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name) private readonly urlModel: Model<Url>,
    private readonly qrCodeService: QRCodeService,
  ) { }

  async shortenUrl(shortenUrlDto: ShortenUrlDto, request: any): Promise<string> {
    const { originalUrl, customUrl } = shortenUrlDto;
    // Validate the JWT and extract the user ID
    const payload = request.user; // `request.user` contains the decoded JWT payload
    const userId = payload.id;
    if (!userId) {
      throw new UnauthorizedException('User is not authorized');
    }
    const shortUrl = customUrl || generateShortUrl(6);
    if (!shortUrl) {
      throw new BadRequestException('Failed to generate a valid short URL');
    }
    if (customUrl) {
      const existingCustomUrl = await this.urlModel.findOne({ customUrl });
      if (existingCustomUrl) {
        throw new BadRequestException('Custom URL already exists');
      }
    }
    const existingShortUrl = await this.urlModel.findOne({ shortUrl });
    if (existingShortUrl) {
      throw new BadRequestException('Generated short URL already exists');
    }
    const url = new this.urlModel({
      originalUrl,
      shortUrl,
      customUrl,
      user: userId,//Saving user ID with the URL
    });
    await url.save();
    return shortUrl;
  }


  async getOriginalUrl(shortUrl: string): Promise<string> {
    const urlRecord = await this.urlModel.findOne({ shortUrl });
    if (!urlRecord) {
      throw new BadRequestException('Short URL not found');
    }
    urlRecord.clickCount += 1;
    await urlRecord.save();
    return urlRecord.originalUrl;
  }

  async generateQrCode(shortUrl: string, user: string): Promise<string> {
    return this.qrCodeService.generateQrCode(shortUrl, user);
  }

  async getLinkHistory(userId: string): Promise<Url[]> {
    const urls = await this.urlModel.find({ user: userId });
    if (!urls || urls.length === 0) {
      throw new BadRequestException('No URLs found for the specified user');
    }
    return urls;
  }

  async customizeShortUrl(
    customizeShortUrlDto: CustomizeShortUrlDto,
  ): Promise<string> {
    const { customUrl, shortUrl } = customizeShortUrlDto;
    //Check if the short URL exists
    const urlRecord = await this.urlModel.findOne({ shortUrl });
    if (!urlRecord) {
      throw new BadRequestException('Short URL not found');
    }
    // Check if the custom URL is already in use
    const existingCustomUrl = await this.urlModel.findOne({ customUrl });
    if (existingCustomUrl) {
      throw new ConflictException('Custom URL already in use');
    }
    // Update the URL record with the new custom URL
    urlRecord.customUrl = customUrl;
    urlRecord.shortUrl = customUrl; // Optionally, update the shortUrl field as well
    await urlRecord.save();
    return urlRecord.customUrl;
  }

  async getLinkAnalytics(linkId: string): Promise<any> {
    const url = await this.urlModel.findById(linkId).exec()
    if (!url) {
      throw new NotFoundException('Url Not Found')
    }
    return {
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      customUrl: url.customUrl,
      clicks: url.clickCount,
      qrCodeUrl: url.QrCodeUrl,
    }
  }
}
