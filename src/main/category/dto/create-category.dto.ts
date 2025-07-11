import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    default: 'Winter',
  })
  @IsString()
  name: string;
}
