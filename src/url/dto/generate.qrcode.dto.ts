import { IsString, IsNotEmpty } from 'class-validator';

export class GenerateQrCodeDto {
  @IsString()
  @IsNotEmpty()
  shortUrl: string;

  // @IsString()
  // @IsNotEmpty()
  // user: string;
}
