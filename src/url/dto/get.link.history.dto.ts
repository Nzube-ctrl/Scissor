import { IsString, IsNotEmpty } from 'class-validator';

export class GetLinkHistoryDto {
  @IsString()
  @IsNotEmpty()
  user: string;
}
