import { Wallet } from '../entities/Wallet';

export interface WalletRepository {
  findByUserId(userId: string): Promise<Wallet | null>;
  save(wallet: Wallet): Promise<Wallet>;
  updateBalance(walletId: string, newBalance: number): Promise<Wallet>;
}
