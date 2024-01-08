import { Transaction, TransactionType } from "@core/domain/entities/transaction.entity";
import { CategoryRepository } from "@core/domain/repositories/category-repository.interface";
import { TransactionRepository } from "@core/domain/repositories/transaction-repository.interface";

export type CreateTransactionInput = {
  value: number;
  description: string;
  type: string;
  userId: string;
  date: Date;
  personId?: string;
  categoryId?: string;
  isRecurring?: boolean;
  recurringTimes?: number;
}

export class CreateTransactionUseCase {
  constructor(
    private readonly transctionRepository: TransactionRepository,
    private readonly categoryRepository: CategoryRepository
  ) { }

  async execute(input: CreateTransactionInput): Promise<Transaction | Transaction[]> {
    this.validateInput(input);

    const { categoryId } = input;

    const category = await this.categoryRepository.findById(categoryId);

    if (categoryId && !category) {
      throw new Error('Category not found');
    }

    const normalizedInput = this.normalizeInput(input);

    const { isRecurring, recurringTimes } = normalizedInput;

    if (isRecurring) {
      const transactions = []

      for (let i = 0; i < recurringTimes; i++) {
        const transaction = Transaction.create({
          ...normalizedInput,
          description: `${normalizedInput.description} - ${i + 1}/${recurringTimes}`,
          date: new Date(normalizedInput.date).setMonth(new Date(normalizedInput.date).getMonth() + i)
        });

        const createdTransaction = await this.transctionRepository.create(transaction);

        transactions.push(createdTransaction.toJSON());
      }

      return transactions;
    }

    const transaction = Transaction.create(normalizedInput);

    const createdTransaction = await this.transctionRepository.create(transaction);

    return createdTransaction.toJSON();
  }

  private validateInput(input: CreateTransactionInput) {
    const { value, date, description, type, userId, categoryId, personId, recurringTimes, isRecurring } = input;

    if (!value || !date || !description || !type || !userId) {
      throw new Error('Missing required fields');
    }

    if (typeof value !== 'number') {
      throw new Error('Value must be a number');
    }

    if (value < 0) {
      throw new Error('Value must be greater than zero');
    }

    if (typeof date !== 'object') {
      throw new Error('Date must be a date');
    }

    if (typeof description !== 'string') {
      throw new Error('Description must be a string');
    }

    if (typeof type !== 'string') {
      throw new Error('Type must be a string');
    }

    if (type !== 'income' && type !== 'expense') {
      throw new Error('Type must be income or expense');
    }

    if (typeof userId !== 'string') {
      throw new Error('User id must be a string');
    }

    if (categoryId && typeof categoryId !== 'string') {
      throw new Error('Category id must be a string');
    }

    if (personId && typeof personId !== 'string') {
      throw new Error('Person id must be a string');
    }

    if (recurringTimes && typeof recurringTimes !== 'number') {
      throw new Error('Recurring times must be a number');
    }

    if (isRecurring && recurringTimes && recurringTimes < 0) {
      throw new Error('Recurring times must be greater than zero');
    }

    if (isRecurring && !recurringTimes) {
      throw new Error('Recurring times must be provided');
    }
  }

  private normalizeInput(input: CreateTransactionInput) {
    const { value, date, description, type, userId, categoryId, personId } = input;

    const normalizedDate = new Date(date).getTime();
    const normalizedType = type === 'income' ? TransactionType.INCOME : TransactionType.EXPENSE;

    return {
      value,
      description,
      userId,
      categoryId,
      date: normalizedDate,
      type: normalizedType,
      personId: personId || null,
      isRecurring: input.isRecurring || false,
      recurringTimes: input.recurringTimes || 0,
    }
  }
}