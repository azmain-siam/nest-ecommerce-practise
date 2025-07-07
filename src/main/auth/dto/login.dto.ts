import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    default: 'siam@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '123456',
  })
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  password: string;
}
