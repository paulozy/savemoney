import { Transaction } from "@core/domain/entities/transaction.entity";
import { TransactionRepository } from "@core/domain/repositories/transaction-repository.interface";

export type ShowTransactionInput = {
  id: string;
}

export class ShowTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) { }

  async execute(input: ShowTransactionInput): Promise<Transaction> {
    this.validateInput(input);

    const transaction = await this.transactionRepository.findById(input.id);

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return transaction.toJSON();
  }

  private validateInput(input: ShowTransactionInput) {
    const { id } = input;

    if (!id) {
      throw new Error('Transaction id is required');
    }

    if (typeof id !== 'string') {
      throw new Error('Transaction id must be a string');
    }
  }
}