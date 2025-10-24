import { Request, Response } from 'express';
import { AuthService } from '../../application/usecases/AuthService';
import { SignupDTO, LoginDTO } from '../../application/dtos/AuthDTO';
import { validate } from 'class-validator';

export class AuthController {
  constructor(private authService: AuthService) {}

  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const dto = new SignupDTO();
      Object.assign(dto, req.body);

      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: errors 
        });
      }

      const result = await this.authService.signup(dto.email, dto.password);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const dto = new LoginDTO();
      Object.assign(dto, req.body);

      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: errors 
        });
      }

      const result = await this.authService.login(dto.email, dto.password);
      return res.json(result);
    } catch (error) {
      return res.status(401).json({ error: (error as Error).message });
    }
  }
}
