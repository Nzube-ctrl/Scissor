import { IsString, Length } from 'class-validator';

export class CustomizeShortUrlDto {
  @IsString()
  @Length(5, 50, {
    message: 'Custom URL must be between 5 and 50 characters long',
  })
  customUrl: string;

  @IsString()
  shortUrl: string;
}
