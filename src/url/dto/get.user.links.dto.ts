import { IsString } from 'class-validator';

export class GetUserLinksDto {
  @IsString()
  user: string;
}
