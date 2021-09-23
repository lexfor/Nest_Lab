import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreatePatientDto {
  @MinLength(5)
  @ApiProperty()
  mail: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  user_id: string;
}
