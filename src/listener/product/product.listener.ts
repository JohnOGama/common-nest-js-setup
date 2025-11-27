import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PRODUCT_EVENT, ProductCreatedEventI } from './product.event';

@Injectable()
export class EmailListenerService {
  @OnEvent(PRODUCT_EVENT.CREATED)
  async handleProductCreatedEvent(event: ProductCreatedEventI) {
    console.log('Product created event received');
    await Promise.resolve();
    console.log('event product created', event);
  }
}
