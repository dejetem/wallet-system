export interface AuthUseCase {
  signup(email: string, password: string): Promise<{ user: any; token: string }>;
  login(email: string, password: string): Promise<{ user: any; token: string }>;
}
