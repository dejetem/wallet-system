import { Router } from 'express';
import { WalletController } from '../../infrastructure/controllers/WalletController';
import { WalletService } from '../../application/usecases/WalletService';
import { WalletRepositoryImpl } from '../../infrastructure/repositories/WalletRepositoryImpl';
import { TransactionRepositoryImpl } from '../../infrastructure/repositories/TransactionRepositoryImpl';
import { authenticateToken } from '../../infrastructure/middleware/auth';

const router = Router();

const walletRepository = new WalletRepositoryImpl();
const transactionRepository = new TransactionRepositoryImpl();
const walletService = new WalletService(walletRepository, transactionRepository);
const walletController = new WalletController(walletService);

router.use(authenticateToken);

/**
 * @swagger
 * /api/wallet/balance:
 *   get:
 *     summary: Get wallet balance
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   format: decimal
 *       401:
 *         description: Unauthorized
 */
router.get('/balance', (req, res) => walletController.getBalance(req, res));

/**
 * @swagger
 * /api/wallet/credit:
 *   post:
 *     summary: Credit money to wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0.01
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Credit successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/credit', (req, res) => walletController.credit(req, res));

/**
 * @swagger
 * /api/wallet/debit:
 *   post:
 *     summary: Debit money from wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0.01
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Debit successful
 *       400:
 *         description: Validation error or insufficient funds
 *       401:
 *         description: Unauthorized
 */
router.post('/debit', (req, res) => walletController.debit(req, res));

export default router;