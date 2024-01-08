import { Transaction, TransactionType } from '@core/domain/entities/transaction.entity'
import { TransactionRepository } from '@core/domain/repositories/transaction-repository.interface'
import { InMemoryTransactionRepository } from '@test/repositories/in-memory-transaction-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { MonthBalanceResumeUseCase } from './month-balance-resume.usecase'

const today = new Date().getTime()
const todayOnLastMonth = new Date(today).setMonth(new Date(today).getMonth() - 1)

const positiveCase = [
  {
    userId: 'any_user_id',
    value: 200,
    description: 'any_description',
    type: TransactionType.INCOME,
    date: today,
    categoryId: null,
    createdAt: today,
  },
  {
    userId: 'any_user_id',
    value: 100,
    description: 'any_description',
    type: TransactionType.EXPENSE,
    date: today,
    categoryId: null,
    createdAt: today,
  },
  {
    userId: 'any_user_id',
    value: 100,
    description: 'any_description',
    type: TransactionType.INCOME,
    date: today,
    categoryId: null,
    createdAt: todayOnLastMonth,
  },
  {
    userId: 'any_user_id',
    value: 90,
    description: 'any_description',
    type: TransactionType.EXPENSE,
    date: today,
    categoryId: null,
    createdAt: todayOnLastMonth,
  },
]

const negativeCase = [
  {
    userId: 'any_user_id',
    value: 100,
    description: 'any_description',
    type: TransactionType.INCOME,
    date: today,
    categoryId: null,
    createdAt: todayOnLastMonth,
  },
  {
    userId: 'any_user_id',
    value: 80,
    description: 'any_description',
    type: TransactionType.EXPENSE,
    date: today,
    categoryId: null,
    createdAt: todayOnLastMonth,
  },
  {
    userId: 'any_user_id',
    value: 200,
    description: 'any_description',
    type: TransactionType.INCOME,
    date: today,
    categoryId: null,
    createdAt: today,
  },
  {
    userId: 'any_user_id',
    value: 20,
    description: 'any_description',
    type: TransactionType.EXPENSE,
    date: today,
    categoryId: null,
    createdAt: today,
  },
]

describe('balance resume usecase', () => {
  let usecase: MonthBalanceResumeUseCase
  let transactionRepository: TransactionRepository

  const payload = {
    userId: 'any_user_id',
  }

  beforeEach(async () => {
    transactionRepository = new InMemoryTransactionRepository()
    usecase = new MonthBalanceResumeUseCase(transactionRepository)
  })

  it('should return the balance resume - positive case', async () => {
    positiveCase.forEach(async transaction => {
      const t = Transaction.create(transaction)
      await transactionRepository.create(t)
    })

    const balanceResume = await usecase.execute(payload)

    expect(balanceResume).toEqual({
      income: {
        total: 200,
        increase: true,
        percentage: 1,
      },
      expense: {
        total: 100,
        increase: true,
        percentage: 0.1,
      },
      balance: {
        total: 100,
        increase: true,
        percentage: 9,
      },
      saves: {
        total: 100,
        increase: true,
        percentage: 9,
      }
    })
  })

  it('should return the balance resume - negative case', async () => {
    negativeCase.forEach(async transaction => {
      const t = Transaction.create(transaction)
      await transactionRepository.create(t)
    })

    const balanceResume = await usecase.execute(payload)

    expect(balanceResume).toEqual({
      income: {
        total: 200,
        increase: true,
        percentage: 1,
      },
      expense: {
        total: 20,
        increase: false,
        percentage: -0.8,
      },
      balance: {
        total: 180,
        increase: true,
        percentage: 8,
      },
      saves: {
        total: 180,
        increase: true,
        percentage: 8,
      }
    })
  })

  it('should return the balance resume - empty case', async () => {
    const balanceResume = await usecase.execute(payload)

    expect(balanceResume).toEqual({
      income: {
        total: 0,
        increase: false,
        percentage: 0,
      },
      expense: {
        total: 0,
        increase: false,
        percentage: 0,
      },
      balance: {
        total: 0,
        increase: false,
        percentage: 0,
      },
      saves: {
        total: 0,
        increase: false,
        percentage: 0,
      }
    })
  })
})
