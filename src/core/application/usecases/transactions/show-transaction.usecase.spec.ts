import { Transaction, TransactionType } from '@core/domain/entities/transaction.entity'
import { TransactionRepository } from '@core/domain/repositories/transaction-repository.interface'
import { InMemoryTransactionRepository } from '@test/repositories/in-memory-transaction-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ShowTransactionUseCase } from './show-transaction.usecase'

describe('show transaction usecase', () => {
  let usecase: ShowTransactionUseCase
  let transactionRepository: TransactionRepository
  let transaction: Transaction

  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()

    transaction = Transaction.create({
      value: 100,
      description: 'any_description',
      type: TransactionType.INCOME,
      userId: 'any_user_id',
      categoryId: 'any_category_id',
      date: new Date().getTime(),
    })

    transactionRepository.create(transaction)

    usecase = new ShowTransactionUseCase(transactionRepository)
  })

  it('should show transaction', async () => {
    const result = await usecase.execute({ id: transaction.id })

    expect(result).toEqual(transaction.toJSON())
  })

  it('should throw error when transaction not found', async () => {
    await expect(usecase.execute({ id: 'invalid_id' })).rejects.toThrowError('Transaction not found')
  })

  it('should throw error when id is not provided', async () => {
    await expect(usecase.execute({ id: '' })).rejects.toThrowError('Transaction id is required')
  })

  it('should throw error when id is not a string', async () => {
    await expect(usecase.execute({ id: 1 as any })).rejects.toThrowError('Transaction id must be a string')
  })
})
