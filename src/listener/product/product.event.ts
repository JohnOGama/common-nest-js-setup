import { Product } from '@/app/api/product/entities/products.schema';

export const PRODUCT_EVENT = {
  CREATED: 'product.created',
};

export interface ProductCreatedEventI {
  product: Product;
}
