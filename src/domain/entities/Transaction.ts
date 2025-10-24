import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit'
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @Column({
    type: 'enum',
    enum: TransactionType
  })
  type!: TransactionType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @CreateDateColumn()
  timestamp!: Date;

  @Column({ type: 'varchar', nullable: true })
  description?: string;
}
