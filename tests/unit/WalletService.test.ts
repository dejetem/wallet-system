import { WalletService } from '../../src/application/usecases/WalletService';
import { WalletRepository } from '../../src/domain/repositories/WalletRepository';
import { TransactionRepository } from '../../src/domain/repositories/TransactionRepository';

describe('WalletService', () => {
  let walletService: WalletService;
  let mockWalletRepository: jest.Mocked<WalletRepository>;
  let mockTransactionRepository: jest.Mocked<TransactionRepository>;

  beforeEach(() => {
    mockWalletRepository = {
      findByUserId: jest.fn(),
      save: jest.fn(),
      updateBalance: jest.fn(),
    };

    mockTransactionRepository = {
      save: jest.fn(),
      findByUserId: jest.fn(),
      findById: jest.fn(),
    };

    walletService = new WalletService(mockWalletRepository, mockTransactionRepository);
  });

  describe('credit', () => {
    it('should credit amount to wallet successfully', async () => {
      const userId = 'user123';
      const amount = 100;
      const existingWallet = {
        id: 'wallet123',
        userId,
        balance: 50,
        createdAt: new Date('2020-01-01T00:00:00.000Z'),
        updatedAt: new Date('2020-01-01T00:00:00.000Z'),
      };

      mockWalletRepository.findByUserId.mockResolvedValue(existingWallet);
      mockWalletRepository.updateBalance.mockResolvedValue({ ...existingWallet, balance: 150 });

      await walletService.credit(userId, amount);

      expect(mockWalletRepository.updateBalance).toHaveBeenCalledWith('wallet123', 150);
      expect(mockTransactionRepository.save).toHaveBeenCalled();
    });
  });

  describe('debit', () => {
    it('should throw error for insufficient funds', async () => {
      const userId = 'user123';
      const amount = 100;
      const existingWallet = {
        id: 'wallet123',
        userId,
        balance: 50,
        createdAt: new Date('2020-01-01T00:00:00.000Z'),
        updatedAt: new Date('2020-01-01T00:00:00.000Z'),
      };

      mockWalletRepository.findByUserId.mockResolvedValue(existingWallet);

      await expect(walletService.debit(userId, amount)).rejects.toThrow('Insufficient funds');
    });
  });
});
