import { Transaction, TransactionType } from "@core/domain/entities/transaction.entity";
import { Transaction as RawTransaction } from '@prisma/client';

export class TransactionMapper {
  static toDomain(transactionData: RawTransaction): Transaction {
    const transaction = Transaction.create({
      id: transactionData.id,
      value: transactionData.value,
      description: transactionData.description,
      type: transactionData.type as TransactionType,
      date: new Date(transactionData.date).getTime(),
      categoryId: transactionData.categoryId,
      personId: transactionData.personId,
      userId: transactionData.userId,
      createdAt: new Date(transactionData.createdAt).getTime(),
      updatedAt: new Date(transactionData.updatedAt).getTime(),
    });

    return transaction;
  }

  static toPersistence(transaction: Transaction): RawTransaction {
    const rawData = transaction.toJSON();

    return {
      id: rawData.id,
      value: rawData.value,
      description: rawData.description,
      type: rawData.type,
      date: new Date(rawData.date),
      categoryId: rawData.categoryId,
      personId: rawData.personId,
      userId: rawData.userId,
      createdAt: new Date(rawData.createdAt),
      updatedAt: new Date(rawData.updatedAt),
    }
  }
}