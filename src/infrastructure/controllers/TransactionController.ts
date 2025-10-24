import { Request, Response } from 'express';
import { TransactionService } from '../../application/usecases/TransactionService';

export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  async getHistory(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const transactions = await this.transactionService.getTransactionHistory(userId);
      res.json({ transactions });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
