import { Repository } from 'typeorm';
import { Transaction } from '../../domain/entities/Transaction';
import { TransactionRepository } from '../../domain/repositories/TransactionRepository';
import { AppDataSource } from '../database/data-source';

export class TransactionRepositoryImpl implements TransactionRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = AppDataSource.getRepository(Transaction);
  }

  async save(transaction: Transaction): Promise<Transaction> {
    return this.repository.save(transaction);
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return this.repository.find({ 
      where: { userId },
      order: { timestamp: 'DESC' }
    });
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.repository.findOne({ where: { id } });
  }
}
