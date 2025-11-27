import { Product } from '@/app/api/product/entities/products.schema';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PRODUCT_EVENT } from './product.event';

@Injectable()
export class EmailListenerService {
  @OnEvent(PRODUCT_EVENT.CREATED)
  async handleProductCreatedEvent(event: { product: Product }) {
    console.log('Product created event received');
    await Promise.resolve();
    console.log('event product created', event);
  }
}
