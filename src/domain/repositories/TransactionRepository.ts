import { Transaction } from '../entities/Transaction';

export interface TransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  findByUserId(userId: string): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
}
