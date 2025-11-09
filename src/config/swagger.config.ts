import { registerAs } from '@nestjs/config';

export const SwaggerKey = 'swaggerKey';

export interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
}

export default registerAs(SwaggerKey, () => ({
  title: 'Payment API',
  description: 'API documentation for payment system',
  version: '1.0.0',
}));
