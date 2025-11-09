import { Module } from '@nestjs/common';
import { StripeController } from './stripe/stripe.controller';
import { StripeService } from './stripe/stripe.service';
import { XenditController } from './xendit/xendit.controller';
import { XenditService } from './xendit/xendit.service';

@Module({
  providers: [StripeService, XenditService],
  controllers: [StripeController, XenditController],
})
export class PaymentsModule {}
