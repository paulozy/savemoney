import { TransactionType } from "@core/domain/entities/transaction.entity";
import { CategoryRepository } from "@core/domain/repositories/category-repository.interface";
import { TransactionRepository } from "@core/domain/repositories/transaction-repository.interface";

export type UpdateTransactionInput = {
  id: string;
  categoryId?: string;
  value?: number;
  description?: string;
  date?: Date;
  type?: string;
}

export class UpdateTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private readonly categoryRepository: CategoryRepository
  ) { }

  async execute(input: UpdateTransactionInput) {
    this.validateInput(input);

    const transaction = await this.transactionRepository.findById(input.id);

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const { categoryId } = input;

    const category = await this.categoryRepository.findById(categoryId);

    if (categoryId && !category) {
      throw new Error('Category not found');
    }

    const normalizedInput = this.normalizeInput(input);

    transaction.update(normalizedInput);

    const updatedTransaction = await this.transactionRepository.save(transaction);

    return updatedTransaction
  }

  private validateInput(input: UpdateTransactionInput) {
    const { id, value, description, date, type, categoryId } = input;

    if (!id) {
      throw new Error('Id is required');
    }

    if (value && value < 0) {
      throw new Error('Value must be greater than 0');
    }

    if (description && description.length < 3) {
      throw new Error('Description must be greater than 3 characters');
    }

    if (date && typeof date !== 'string') {
      throw new Error('Date must be a date');
    }

    if (type && type !== 'income' && type !== 'expense') {
      throw new Error('Type must be income or expense');
    }

    if (categoryId && typeof categoryId !== 'string') {
      throw new Error('Category id must be a string');
    }
  }

  private normalizeInput(input: UpdateTransactionInput) {
    const { value, description, date, type, categoryId } = input;

    const normalizedDate = new Date(date).getTime();

    console.log('normalizedDate', normalizedDate)

    const normalizedType = this.normalizeType(type);

    return {
      value,
      description,
      categoryId,
      date: normalizedDate,
      type: normalizedType,
    }
  }

  private normalizeType(type: string) {
    return type === 'income' ? TransactionType.INCOME : TransactionType.EXPENSE;
  }
}