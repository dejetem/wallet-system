import { TransactionUseCase } from '../../domain/usecases/TransactionUseCase';
import { TransactionRepository } from '../../domain/repositories/TransactionRepository';
import { Transaction } from '../../domain/entities/Transaction';

export class TransactionService implements TransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async getTransactionHistory(userId: string): Promise<Transaction[]> {
    return this.transactionRepository.findByUserId(userId);
  }
}
