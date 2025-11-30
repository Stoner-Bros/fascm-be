import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
  origin: [
    process.env.FRONTEND_DOMAIN || 'http://localhost:3000',
    process.env.ADMIN_DOMAIN || 'http://localhost:3001',
    'http://localhost:3000', // Default frontend
    'http://localhost:3001', // Default admin
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
