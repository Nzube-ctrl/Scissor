import {
  Controller,
  ValidationPipe,
  Get,
  Post,
  Body,
  Redirect,
  Param,
  UseGuards,
  BadRequestException,
  ConflictException,
  Req,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './dto/shorten.url.dto';
import { GenerateQrCodeDto } from './dto/generate.qrcode.dto';
import { CustomizeShortUrlDto } from './dto/customize.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Url } from 'src/schemas/url.schema';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @UseGuards(JwtAuthGuard)
  @Post('shorten')
  async shortenUrl(@Body(ValidationPipe) shortenUrlDto: ShortenUrlDto, @Req() request: any): Promise<string> {
    // return this.urlService.shortenUrl(shortenUrlDto, request);
    const shortUrl = await this.urlService.shortenUrl(shortenUrlDto, request);
    const baseUrl = request.protocol + '://' + request.get('host');
    const redirectLink = `${baseUrl}/url/${shortUrl}`;
    return redirectLink;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':shortUrl')
  @Redirect()
  async redirect(@Param('shortUrl') shortUrl: string) {
    try {
      const originalUrl = await this.urlService.getOriginalUrl(shortUrl);
      return { url: originalUrl };
    } catch (error) {
      throw new BadRequestException('Short URL not found');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('generate-qrCode')
  async generateQrCode(
    @Body(ValidationPipe) generateQrCodeDto: GenerateQrCodeDto,
    @Req() request: any
  ): Promise<string> {
    const { shortUrl } = generateQrCodeDto;
    return this.urlService.generateQrCode(shortUrl, request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getLinkHistory(@Param('userId') userId: string) {
    return this.urlService.getLinkHistory(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('customize-short-url')
  async customizeShortUrl(
    @Body(ValidationPipe) customizeShortUrlDto: CustomizeShortUrlDto,
    @Req() request: any
  ) {
    try {
      const shortUrl = await this.urlService.customizeShortUrl(customizeShortUrlDto);
      // Constructing the full redirect URL
      const baseUrl = request.protocol + '://' + request.get('host');
      const redirectLink = `${baseUrl}/url/${shortUrl}`;  // Using "url" as the path
      return { message: 'Short URL customized successfully', url: redirectLink };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('analytics/:linkId')
  async getLinkAnalytics(@Param('linkId') linkId: string): Promise<Url> {
    return this.urlService.getLinkAnalytics(linkId)
  }
}
