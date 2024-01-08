import { Transaction } from "@core/domain/entities/transaction.entity";
import { FindByUserIdInput, TransactionRepository } from "@core/domain/repositories/transaction-repository.interface";
import { PrismaClient } from "@prisma/client";
import { TransactionMapper } from "../mappers/transaction.mapper";

export class PrismaTransactionRepository implements TransactionRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) { }

  async exists(id: string): Promise<boolean> {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id
      }
    });

    return !!transaction;
  }

  async create(transaction: Transaction): Promise<Transaction | any> {
    const rawData = TransactionMapper.toPersistence(transaction);

    const createdTransaction = await this.prisma.transaction.create({
      data: {
        userId: rawData.userId,
        value: rawData.value,
        description: rawData.description,
        type: rawData.type,
        date: rawData.date,
        categoryId: rawData.categoryId,
        personId: rawData.personId,
        createdAt: rawData.createdAt,
        updatedAt: rawData.updatedAt,
      }
    });

    return TransactionMapper.toDomain(createdTransaction);
  }

  async save(transaction: Transaction): Promise<Transaction> {
    const rawData = TransactionMapper.toPersistence(transaction);

    const updatedTransaction = await this.prisma.transaction.update({
      where: {
        id: rawData.id
      },
      data: {
        userId: rawData.userId,
        value: rawData.value,
        description: rawData.description,
        type: rawData.type,
        date: rawData.date,
        categoryId: rawData.categoryId,
        personId: rawData.personId,
        createdAt: rawData.createdAt,
        updatedAt: rawData.updatedAt,
      }
    });

    return TransactionMapper.toDomain(updatedTransaction);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({
      where: {
        id
      }
    });
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id
      }
    });

    return TransactionMapper.toDomain(transaction);
  }

  async findByUserId(input: FindByUserIdInput): Promise<Transaction[]> {
    const { userId, description, limit, page, value } = input;

    const query = {
      userId
    }

    if (description) {
      query['description'] = {
        contains: description
      }
    }

    if (value) {
      query['value'] = {
        equals: value
      }
    }

    const transactions = await this.prisma.transaction.findMany({
      where: query,
      skip: page ? (page - 1) * limit : undefined,
      take: limit ? limit : 10,
    });

    return transactions.map(transaction => TransactionMapper.toDomain(transaction));
  }

  async findByUserIdAndDate(userId: string, date: number): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        date: {
          equals: new Date(date)
        }
      }
    });

    return transactions.map(transaction => TransactionMapper.toDomain(transaction));
  }
}