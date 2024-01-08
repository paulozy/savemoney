import { TransactionRepository } from "@core/domain/repositories/transaction-repository.interface";

export type DeleteTransactionInput = {
  id: string;
};

export class DeleteTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) { }

  async execute({ id }: DeleteTransactionInput): Promise<void> {
    this.validateInput({ id });

    const transaction = await this.transactionRepository.exists(id);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    await this.transactionRepository.delete(id);
  }

  private validateInput({ id }: DeleteTransactionInput) {
    if (!id) {
      throw new Error("Missing required fields");
    }

    if (typeof id !== "string") {
      throw new Error("Invalid field type");
    }
  }
}