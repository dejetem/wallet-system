import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env['PORT'] || 3000,
  database: {
    host: process.env['DB_HOST'] || 'localhost',
    port: parseInt(process.env['DB_PORT'] || '5432'),
    username: process.env['DB_USERNAME'] || 'postgres',
    password: process.env['DB_PASSWORD'] || 'password',
    name: process.env['DB_NAME'] || 'wallet_system',
  },
  jwt: {
    secret: process.env['JWT_SECRET'] || 'fallback-secret-key-change-in-production',
    expiresIn: process.env['JWT_EXPIRES_IN'] || '24h',
  },
};
