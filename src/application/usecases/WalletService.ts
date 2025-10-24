import { WalletUseCase } from '../../domain/usecases/WalletUseCase';
import { WalletRepository } from '../../domain/repositories/WalletRepository';
import { TransactionRepository } from '../../domain/repositories/TransactionRepository';
import { TransactionType } from '../../domain/entities/Transaction';
import { v4 as uuidv4 } from 'uuid';

export class WalletService implements WalletUseCase {
  constructor(
    private walletRepository: WalletRepository,
    private transactionRepository: TransactionRepository
  ) {}

  async getBalance(userId: string): Promise<number> {
    const wallet = await this.walletRepository.findByUserId(userId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    return wallet.balance;
  }

  async credit(userId: string, amount: number, description?: string): Promise<void> {
    const wallet = await this.walletRepository.findByUserId(userId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

      // Convert to numbers, perform operation, then fix to 2 decimal places
    const currentBalance = parseFloat(wallet.balance.toString());
    const creditAmount = parseFloat(amount.toString());
    const newBalance = parseFloat((currentBalance + creditAmount).toFixed(2));
    await this.walletRepository.updateBalance(wallet.id, newBalance);

    await this.transactionRepository.save({
      id: uuidv4(),
      userId,
      type: TransactionType.CREDIT,
      amount,
      timestamp: new Date(),
      description: description ?? ''
    });
  }

  async debit(userId: string, amount: number, description?: string): Promise<void> {
    const wallet = await this.walletRepository.findByUserId(userId);
    
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const currentBalance = parseFloat(wallet.balance.toString());
    const creditAmount = parseFloat(amount.toString());

    if (currentBalance < creditAmount) {
      throw new Error('Insufficient funds');
    }

    const newBalance = parseFloat((currentBalance - creditAmount).toFixed(2));
    await this.walletRepository.updateBalance(wallet.id, newBalance);

    await this.transactionRepository.save({
      id: uuidv4(),
      userId,
      type: TransactionType.DEBIT,
      amount,
      timestamp: new Date(),
      description: description ?? ''
    });
  }
}
