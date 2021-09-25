import { IsString, Length } from 'class-validator';

export class ResolutionValueDto {
  @Length(3, 50)
  @IsString()
  value: string;
}
