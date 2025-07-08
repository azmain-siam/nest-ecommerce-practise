import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    default: 'Siam Hossain',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    default: 'siam@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '01837588068',
  })
  @IsString()
  @Matches(/^\+?[0-9]{10,15}$/, {
    message: 'Phone number must be 10–15 digits and may include a leading +',
  })
  phone: string;

  @ApiProperty({
    default: '01837588068',
  })
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  password: string;
}
