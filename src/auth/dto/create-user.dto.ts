import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(5)
  @ApiProperty()
  login: string;

  @MinLength(10)
  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  gender: string;
}
