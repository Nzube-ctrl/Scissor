import {
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsString,
} from 'class-validator';

export class ShortenUrlDto {
  @IsUrl()
  @IsNotEmpty()
  originalUrl: string;

  @IsOptional()
  @IsString()
  customUrl: string;
}
