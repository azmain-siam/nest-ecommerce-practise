import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    default: 'iPhone 14pro Max',
  })
  @IsString()
  name: string;

  @ApiProperty({
    default: 799,
  })
  @IsInt()
  price: number;

  @ApiProperty({
    default: 13,
  })
  @IsInt()
  stock: number;

  @ApiProperty({
    default: 2,
  })
  @IsInt()
  categoryId: number;
}
