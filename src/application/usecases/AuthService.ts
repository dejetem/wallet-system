import { AuthUseCase } from '../../domain/usecases/AuthUseCase';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { WalletRepository } from '../../domain/repositories/WalletRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export class AuthService implements AuthUseCase {
  constructor(
    private userRepository: UserRepository,
    private walletRepository: WalletRepository
  ) {}

  async signup(email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.userRepository.save({
      id: uuidv4(),
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Create wallet for user
    await this.walletRepository.save({
      id: uuidv4(),
      userId: user.id,
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const token = this.generateToken(user.id);

    return {
      user: { id: user.id, email: user.email },
      token
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user.id);

    return {
      user: { id: user.id, email: user.email },
      token
    };
  }

  private generateToken(userId: string): string {
    const jwtSecret = process.env['JWT_SECRET'] || 'fallback-secret';
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '24h' });
  }
}
