import { TransactionRepository } from "@core/domain/repositories/transaction-repository.interface";

export type MonthBalanceResumeInput = {
  userId: string;
}

type BalanceResumeInput = {
  currentIncome: number;
  currentExpense: number;
  currentBalance: number;
  lastIncome: number;
  lastExpense: number;
  lastBalance: number;
}

export class MonthBalanceResumeUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository
  ) { }

  async execute(input: MonthBalanceResumeInput) {
    const { userId } = input;
    const { currentPeriod, lastPeriod } = this.getPeriods();

    const { income: currentIncome, expense: currentExpense, balance: currentBalance } = await this.getResumesByPeriod(userId, currentPeriod);

    const { income: lastIncome, expense: lastExpense, balance: lastBalance } = await this.getResumesByPeriod(userId, lastPeriod);

    const balanceResume = this.getBalanceResume({
      currentIncome,
      currentExpense,
      currentBalance,
      lastIncome,
      lastExpense,
      lastBalance,
    });

    return balanceResume;
  }

  private async getResumesByPeriod(userId: string, period: string) {
    const defaultInput = {
      page: 1,
      limit: 100,
    }

    const transactions = await this.transactionRepository.findByUserId({ ...defaultInput, userId, period });

    const { income, expense, balance } = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'INCOME') {
        acc.income += transaction.value;
      } else {
        acc.expense += transaction.value;
      }

      acc.balance = acc.income - acc.expense;

      return acc
    }, { income: 0, expense: 0, balance: 0 });

    return { income, expense, balance };
  }

  private getPeriods() {
    const currentPeriod = new Date().getMonth() + 1 + '/' + new Date().getFullYear();
    const lastPeriod = new Date().getMonth() + '/' + new Date().getFullYear();

    return { currentPeriod, lastPeriod };
  }

  private getBalanceResume(input: BalanceResumeInput) {
    const { currentIncome, currentExpense, currentBalance, lastIncome, lastExpense, lastBalance } = input;

    const currentTotalSaves = currentIncome - currentExpense;
    const lastTotalSaves = lastIncome - lastExpense;

    const output = {
      income: {
        total: currentIncome,
        increase: currentIncome > lastIncome,
        percentage: this.getPercetage(currentIncome, lastIncome)
      },
      expense: {
        total: currentExpense,
        increase: currentExpense > lastExpense,
        percentage: this.getPercetage(currentExpense, lastExpense)
      },
      balance: {
        total: currentBalance,
        increase: currentBalance > lastBalance,
        percentage: this.getPercetage(currentBalance, lastBalance)
      },
      saves: {
        total: currentTotalSaves,
        increase: currentTotalSaves > lastTotalSaves,
        percentage: this.getPercetage(currentTotalSaves, lastTotalSaves)
      }
    }

    return output;
  }

  private getPercetage(current: number, last: number) {
    const isZero = current === 0 && last === 0;

    return isZero ? 0 : Number((((current - last) / last) * 100 / 100).toFixed(1));
  }
}