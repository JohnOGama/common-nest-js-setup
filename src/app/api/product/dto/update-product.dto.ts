import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Product name',
    example: 'Premium Wireless Headphones - Updated',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Product price',
    example: 249.99,
    type: 'number',
  })
  price?: string | number;

  @ApiPropertyOptional({
    description: 'Product image URL',
    example: 'https://example.com/images/headphones-new.jpg',
  })
  image?: string;
}
