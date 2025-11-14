import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Premium Wireless Headphones',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product price',
    example: 299.99,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  price: string | number;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/images/headphones.jpg',
  })
  @IsNotEmpty()
  @IsString()
  image: string;
}
