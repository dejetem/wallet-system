export interface WalletUseCase {
  getBalance(userId: string): Promise<number>;
  credit(userId: string, amount: number, description?: string): Promise<void>;
  debit(userId: string, amount: number, description?: string): Promise<void>;
}
