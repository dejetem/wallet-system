import { DataSource } from 'typeorm';
import { config } from '../../config/env';
import { User } from '../../domain/entities/User';
import { Wallet } from '../../domain/entities/Wallet';
import { Transaction } from '../../domain/entities/Transaction';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: process.env['NODE_ENV'] !== 'production',
  logging: process.env['NODE_ENV'] === 'development',
  entities: [User, Wallet, Transaction],
  migrations: ['dist/src/infrastructure/database/migrations/*.js'],
  subscribers: [],
});

