import { Router } from 'express';
import { AuthController } from '../../infrastructure/controllers/AuthController';
import { AuthService } from '../../application/usecases/AuthService';
import { UserRepositoryImpl } from '../../infrastructure/repositories/UserRepositoryImpl';
import { WalletRepositoryImpl } from '../../infrastructure/repositories/WalletRepositoryImpl';

const router = Router();

const userRepository = new UserRepositoryImpl();
const walletRepository = new WalletRepositoryImpl();
const authService = new AuthService(userRepository, walletRepository);
const authController = new AuthController(authService);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Validation error or user already exists
 */
router.post('/signup', (req, res) => authController.signup(req, res));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', (req, res) => authController.login(req, res));

export default router;