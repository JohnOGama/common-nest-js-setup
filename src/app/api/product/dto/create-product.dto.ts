import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Premium Wireless Headphones',
  })
  name: string;

  @ApiProperty({
    description: 'Product price',
    example: 299.99,
    type: 'number',
  })
  price: string | number;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/images/headphones.jpg',
  })
  image: string;
}
