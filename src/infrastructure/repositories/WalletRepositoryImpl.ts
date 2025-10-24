import { Repository } from 'typeorm';
import { Wallet } from '../../domain/entities/Wallet';
import { WalletRepository } from '../../domain/repositories/WalletRepository';
import { AppDataSource } from '../database/data-source';

export class WalletRepositoryImpl implements WalletRepository {
  private repository: Repository<Wallet>;

  constructor() {
    this.repository = AppDataSource.getRepository(Wallet);
  }

  async findByUserId(userId: string): Promise<Wallet | null> {
    return this.repository.findOne({ where: { userId } });
  }

  async save(wallet: Wallet): Promise<Wallet> {
    return this.repository.save(wallet);
  }

  async updateBalance(walletId: string, newBalance: number): Promise<Wallet> {
    await this.repository.update(walletId, { 
      balance: newBalance, 
      updatedAt: new Date() 
    });
    const wallet = await this.repository.findOne({ where: { id: walletId } });
    if (!wallet) throw new Error('Wallet not found after update');
    return wallet;
  }
}
