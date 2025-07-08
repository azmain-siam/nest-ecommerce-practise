import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user placing the order',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: '625fef13-6ffe-47cc-86ba-e1b955664624',
    description: 'ID of the product being ordered',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the product ordered',
  })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    example: 1200.5,
    description: 'Total price of the order',
  })
  @IsPositive()
  price: number;
}
