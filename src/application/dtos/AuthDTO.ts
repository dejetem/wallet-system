import 'reflect-metadata';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class LoginDTO {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
