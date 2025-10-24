import { IsNumber, IsPositive, IsOptional, IsString } from 'class-validator';

export class CreditDebitDTO {
  @IsNumber()
  @IsPositive()
  amount!: number;

  @IsOptional()
  @IsString()
  description?: string;
}
