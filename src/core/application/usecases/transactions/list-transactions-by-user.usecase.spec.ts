import { Transaction, TransactionType } from '@core/domain/entities/transaction.entity'
import { TransactionRepository } from '@core/domain/repositories/transaction-repository.interface'
import { InMemoryTransactionRepository } from '@test/repositories/in-memory-transaction-repository'
import { randomUUID as uuid } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListTransactionsByUserUseCase } from './list-transactions-by-user.usecase'

describe('list transactions by user usecase', () => {
  let usecase: ListTransactionsByUserUseCase
  let transactionRepository: TransactionRepository

  const userId = uuid()
  const payload = { userId }

  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()

    for (let i = 0; i < 5; i++) {
      transactionRepository.create(
        Transaction.create({
          value: i % 2 === 0 ? 100 : 50,
          description: 'any_description',
          type: i % 2 === 0 ? TransactionType.INCOME : TransactionType.EXPENSE,
          userId,
          categoryId: 'any_category_id',
          date: new Date().getTime(),
          createdAt: i % 2 === 0 ? new Date().getTime() : new Date().getTime() + 1000
        })
      )
    }

    usecase = new ListTransactionsByUserUseCase(transactionRepository)
  })

  it('should list transactions by user', async () => {
    const transactions = await usecase.execute(payload)

    expect(transactions.length).toBe(5)
  })

  it('should list transactions by user and value', async () => {
    const transactions = await usecase.execute({ ...payload, value: 100 })

    expect(transactions.length).toBe(3)
  })

  it('should list transactions by user and description', async () => {
    const transactions = await usecase.execute({ ...payload, description: 'any_description' })

    expect(transactions.length).toBe(5)
  })

  it('should list transactions by user and sort by asc', async () => {
    const transactions = await usecase.execute({ ...payload, sort: 'asc' })

    expect(transactions[0].createdAt).not.toBe(transactions[transactions.length - 1].createdAt)
  })

  it('should list transactions by user and sort by desc', async () => {
    const transactions = await usecase.execute({ ...payload, sort: 'desc' })

    expect(transactions[0].createdAt).not.toBe(transactions[transactions.length - 1].createdAt)
  })

  it('should list transactions by user and paginate', async () => {
    const transactions = await usecase.execute({ ...payload, page: 2, limit: 2 })

    expect(transactions.length).toBe(2)
  })

  it('should throw if no user id is provided', async () => {
    const promise = usecase.execute({} as any)

    await expect(promise).rejects.toThrow('Missing required fields')
  })

  it('should throw if user id is not a string', async () => {
    const promise = usecase.execute({ userId: 123 } as any)

    await expect(promise).rejects.toThrow('Invalid field type')
  })

  it('should throw if value is not a number', async () => {
    const promise = usecase.execute({ ...payload, value: 'any_value' } as any)

    await expect(promise).rejects.toThrow('Invalid field type')
  })

  it('should throw if sort is not asc or desc', async () => {
    const promise = usecase.execute({ ...payload, sort: 'any_sort' })

    await expect(promise).rejects.toThrow('Invalid field value')
  })

  it('should throw if page is not a number', async () => {
    const promise = usecase.execute({ ...payload, page: 'any_page' } as any)

    await expect(promise).rejects.toThrow('Invalid field type')
  })

  it('should throw if limit is not a number', async () => {
    const promise = usecase.execute({ ...payload, limit: 'any_limit' } as any)

    await expect(promise).rejects.toThrow('Invalid field type')
  })

  it('should throw if description is not a string', async () => {
    const promise = usecase.execute({ ...payload, description: 123 } as any)

    await expect(promise).rejects.toThrow('Invalid field type')
  })

  it('should return empty array if no transactions are found', async () => {
    const transactions = await usecase.execute({ ...payload, userId: uuid() })

    expect(transactions.length).toBe(0)
  })

  it('should return empty array if no transactions are found by value', async () => {
    const transactions = await usecase.execute({ ...payload, value: 1000 })

    expect(transactions.length).toBe(0)
  })

  it('should return empty array if no transactions are found by description', async () => {
    const transactions = await usecase.execute({ ...payload, description: 'any_description' })

    expect(transactions.length).toBe(5)
  })
})
