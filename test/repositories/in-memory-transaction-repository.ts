import { Transaction } from '@core/domain/entities/transaction.entity';
import { FindByUserIdInput, TransactionRepository } from '@core/domain/repositories/transaction-repository.interface';

export class InMemoryTransactionRepository implements TransactionRepository {
  transactions: Transaction[] = [];

  async exists(id: string): Promise<boolean> {
    const transaction = this.transactions.find(transaction => transaction.id === id);

    return !!transaction;
  }

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async save(transaction: Transaction): Promise<Transaction> {
    const index = this.transactions.findIndex(t => t.id === transaction.id);

    this.transactions[index] = transaction;

    return transaction.toJSON();
  }

  async delete(id: string): Promise<void> {
    const index = this.transactions.findIndex(transaction => transaction.id === id);

    this.transactions.splice(index, 1);
  }

  async findById(id: string): Promise<Transaction | undefined> {
    const transaction = this.transactions.find(transaction => transaction.id === id);

    if (!transaction) {
      return undefined;
    }

    return transaction
  }

  async findByUserId({
    userId,
    page,
    limit,
    sort,
    value,
    description,
    period
  }: FindByUserIdInput): Promise<Transaction[]> {
    let transactions = this.transactions.filter(transaction => transaction.userId === userId);

    if (value) {
      transactions = transactions.filter(transaction => transaction.value === value);
    }

    if (description) {
      transactions = transactions.filter(transaction => transaction.description === description);
    }

    if (period) {
      transactions = transactions.filter(transaction => {
        const transactionPeriod = new Date(transaction.createdAt).getMonth() + 1 + '/' + new Date(transaction.createdAt).getFullYear();

        return transactionPeriod === period;
      });
    }

    transactions = transactions.sort((a, b) => {
      if (sort === 'asc') {
        return a.createdAt - b.createdAt;
      }

      return b.createdAt - a.createdAt;
    });

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedTransactions = transactions.slice(start, end);

    return paginatedTransactions
  }

  async findByUserIdAndDate(userId: string, date: number): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }
}