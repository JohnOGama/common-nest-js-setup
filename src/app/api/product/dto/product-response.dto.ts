import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    description: 'Product ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Product name',
    example: 'Premium Wireless Headphones',
  })
  name: string;

  @ApiProperty({
    description: 'Product price',
    example: '299.99',
  })
  price: string;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/images/headphones.jpg',
  })
  image: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Deletion timestamp (null if not deleted)',
    example: null,
    nullable: true,
  })
  deletedAt: Date | null;

  @ApiProperty({
    description: 'Publication timestamp',
    example: '2024-01-15T10:30:00.000Z',
    nullable: true,
  })
  publishedAt: Date | null;
}
