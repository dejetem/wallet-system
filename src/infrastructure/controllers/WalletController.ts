import { Request, Response } from 'express';
import { WalletService } from '../../application/usecases/WalletService';
import { CreditDebitDTO } from '../../application/dtos/WalletDTO';
import { validate } from 'class-validator';
import { AuthRequest } from '../middleware/auth';

export class WalletController {
  constructor(private walletService: WalletService) {}

  async getBalance(req: Request, res: Response): Promise<Response> {
    try {
      const userId = (req as AuthRequest).user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const balance = await this.walletService.getBalance(userId);
      return res.json({ balance });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async credit(req: Request, res: Response): Promise<Response> {
    try {
      const userId = (req as AuthRequest).user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const dto = new CreditDebitDTO();
      Object.assign(dto, req.body);

      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: errors 
        });
      }

      await this.walletService.credit(userId, dto.amount, dto.description);
      return res.json({ message: 'Credit successful' });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async debit(req: Request, res: Response): Promise<Response> {
    try {
      const userId = (req as AuthRequest).user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const dto = new CreditDebitDTO();
      Object.assign(dto, req.body);

      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: errors 
        });
      }

      await this.walletService.debit(userId, dto.amount, dto.description);
      return res.json({ message: 'Debit successful' });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
