import { Transaction, TransactionType } from '@core/domain/entities/transaction.entity'
import { TransactionRepository } from '@core/domain/repositories/transaction-repository.interface'
import { InMemoryTransactionRepository } from '@test/repositories/in-memory-transaction-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteTransactionUseCase } from './delete-transaction.usecase'

describe('delete transaction usecase', () => {
  let usecase: DeleteTransactionUseCase
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
      date: new Date().getTime()
    })

    transactionRepository.create(
      transaction
    )

    usecase = new DeleteTransactionUseCase(transactionRepository)
  })

  it('should delete a transaction', async () => {
    await expect(usecase.execute({
      id: transaction.id
    })).resolves.toBeUndefined()
  })

  it('should throw if transaction not found', async () => {
    await expect(usecase.execute({
      id: 'invalid_id'
    })).rejects.toThrow('Transaction not found')
  })

  it('should throw if id is not provided', async () => {
    await expect(usecase.execute({
      id: undefined
    })).rejects.toThrow('Missing required fields')
  })

  it('should throw if id is not a string', async () => {
    await expect(usecase.execute({
      id: 123 as any
    })).rejects.toThrow('Invalid field type')
  })
})
