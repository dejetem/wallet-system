import { Router } from 'express';
import { TransactionController } from '../../infrastructure/controllers/TransactionController';
import { TransactionService } from '../../application/usecases/TransactionService';
import { TransactionRepositoryImpl } from '../../infrastructure/repositories/TransactionRepositoryImpl';
import { authenticateToken } from '../../infrastructure/middleware/auth';

const router = Router();

const transactionRepository = new TransactionRepositoryImpl();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

router.use(authenticateToken);

/**
 * @swagger
 * /api/transactions/history:
 *   get:
 *     summary: Get transaction history
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       type:
 *                         type: string
 *                         enum: [credit, debit]
 *                       amount:
 *                         type: number
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                       description:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/history', (req, res) => transactionController.getHistory(req, res));

export default router;
