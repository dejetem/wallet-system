import { Transaction } from '../entities/Transaction';

export interface TransactionUseCase {
  getTransactionHistory(userId: string): Promise<Transaction[]>;
}
