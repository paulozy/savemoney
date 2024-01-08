import { Transaction } from "../entities/transaction.entity";

export type FindByUserIdInput = {
  userId: string;
  page?: number;
  limit?: number;
  sort?: string;
  value?: number;
  description?: string;
  period?: string;
}

export interface TransactionRepository {
  exists(id: string): Promise<boolean>;
  create(transaction: Transaction): Promise<Transaction>;
  save(transaction: Transaction): Promise<Transaction>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Transaction | undefined>;
  findByUserId(input: FindByUserIdInput): Promise<Transaction[]>;
  findByUserIdAndDate(userId: string, date: number): Promise<Transaction[]>;
}