import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { registerAs } from '@nestjs/config';

export default registerAs<CorsOptions>('cors', () => {
  return {
    origin: [
      process.env.FRONTEND_DOMAIN || 'http://localhost:3001',
      process.env.ADMIN_DOMAIN || 'http://localhost:3000',
      'http://localhost:3000', // Default admin
      'http://localhost:3001', // Default frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
      process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
    ],
    credentials: true,
  };
});
