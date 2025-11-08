import { Inject, Injectable } from '@nestjs/common';
import { DrizzleDB } from '@/app/db/drizzle.config';
import { DRIZZLE_ORM } from '@/app/db/drizzle.module';
import { products, NewProduct } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@Inject(DRIZZLE_ORM) private readonly db: DrizzleDB) {}

  async create(dto: CreateProductDto) {
    const productData: NewProduct = {
      name: dto.name,
      price: typeof dto.price === 'number' ? dto.price.toString() : dto.price,
      image: dto.image,
    };
    const [product] = await this.db
      .insert(products)
      .values(productData)
      .returning();
    return product;
  }

  async findAll() {
    return await this.db.select().from(products);
  }

  async findOne(id: number) {
    const [product] = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
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
    return product;
  }

  async remove(id: number) {
    const [product] = await this.db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  async softDelete(id: number) {
    const [product] = await this.db
      .update(products)
      .set({ deletedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return product;
  }
}
