import { Transaction } from "@core/domain/entities/transaction.entity";
import { TransactionRepository } from "@core/domain/repositories/transaction-repository.interface";

export type ListTransactionsByUserInput = {
  userId: string;
  page?: number;
  limit?: number;
  sort?: string;
  value?: number;
  description?: string;
}

export class ListTransactionsByUserUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) { }

  async execute(input: ListTransactionsByUserInput): Promise<Transaction[]> {
    this.validateInput(input);

    const normalizedInput = this.normalizeInput(input);

    const transactions = await this.transactionRepository.findByUserId(normalizedInput);

    return transactions;
  }

  private validateInput(input: ListTransactionsByUserInput) {
    const { userId, value, description, sort, page, limit } = input;

    if (!userId) {
      throw new Error('Missing required fields');
    }

    if (typeof userId !== 'string') {
      throw new Error('Invalid field type');
    }

    if (value && typeof value !== 'number') {
      throw new Error('Invalid field type');
    }

    if (description && typeof description !== 'string') {
      throw new Error('Invalid field type');
    }

    if (sort && sort !== 'asc' && sort !== 'desc') {
      throw new Error('Invalid field value');
    }

    if (page && typeof page !== 'number') {
      throw new Error('Invalid field type');
    }

    if (limit && typeof limit !== 'number') {
      throw new Error('Invalid field type');
    }
  }

  private normalizeInput(input: ListTransactionsByUserInput) {
    const { userId, page, limit, sort, value, description } = input;

    return {
      userId,
      page: page ?? 1,
      limit: limit ?? 10,
      sort: sort ?? 'asc',
      value,
      description
    }
  }
}