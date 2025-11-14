import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NewProduct, products } from './entities/products.schema';
import { DRIZZLE_ORM } from '@/db/drizzle.module';
import { DrizzleDB } from '@/db/drizzle.config';
import { ApiResponseDto } from '@/app/common';

@Injectable()
export class ProductService {
  constructor(@Inject(DRIZZLE_ORM) private readonly db: DrizzleDB) {}

  async create(dto: CreateProductDto) {
    try {
      const productData: NewProduct = {
        name: dto.name,
        price: typeof dto.price === 'number' ? dto.price.toString() : dto.price,
        image: dto.image,
      };
      const [product] = await this.db
        .insert(products)
        .values(productData)
        .returning();
      return ApiResponseDto.created('Product successfully created', product);
    } catch (error) {
      return ApiResponseDto.badRequest((error as Error).message);
    }
  }

  async findAll() {
    try {
      const allProducts = await this.db.select().from(products);
      return ApiResponseDto.ok('Products retrieved successfully', allProducts);
    } catch (error) {
      return ApiResponseDto.serverError((error as Error).message);
    }
  }

  async findOne(id: number) {
    try {
      const [product] = await this.db
        .select()
        .from(products)
        .where(eq(products.id, id));

      if (!product) {
        return ApiResponseDto.notFound('Product not found');
      }

      return ApiResponseDto.ok('Product retrieved successfully', product);
    } catch (error) {
      return ApiResponseDto.serverError((error as Error).message);
    }
  }

  async update(id: number, dto: UpdateProductDto) {
    try {
      const updateData: any = {
        ...dto,
        updatedAt: new Date(),
      };

      if (dto.price !== undefined) {
        updateData.price =
          typeof dto.price === 'number' ? dto.price.toString() : dto.price;
      }

      const [product] = await this.db
        .update(products)
        .set(updateData)
        .where(eq(products.id, id))
        .returning();

      if (!product) {
        return ApiResponseDto.notFound('Product not found');
      }

      return ApiResponseDto.ok('Product successfully updated', product);
    } catch (error) {
      return ApiResponseDto.serverError((error as Error).message);
    }
  }

  async remove(id: number) {
    try {
      const [product] = await this.db
        .delete(products)
        .where(eq(products.id, id))
        .returning();

      if (!product) {
        return ApiResponseDto.notFound('Product not found');
      }

      return ApiResponseDto.ok('Product successfully deleted', product);
    } catch (error) {
      return ApiResponseDto.serverError((error as Error).message);
    }
  }

  async softDelete(id: number) {
    try {
      const [product] = await this.db
        .update(products)
        .set({ deletedAt: new Date() })
        .where(eq(products.id, id))
        .returning();

      if (!product) {
        return ApiResponseDto.notFound('Product not found');
      }

      return ApiResponseDto.ok('Product successfully soft deleted', product);
    } catch (error) {
      return ApiResponseDto.serverError((error as Error).message);
    }
  }
}
