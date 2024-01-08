import { TransactionType } from '@core/domain/entities/transaction.entity'
import { CategoryRepository } from '@core/domain/repositories/category-repository.interface'
import { TransactionRepository } from '@core/domain/repositories/transaction-repository.interface'
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { InMemoryTransactionRepository } from '@test/repositories/in-memory-transaction-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTransactionUseCase } from './create-transaction.usecase'

describe('create transaction usecase', () => {
  let usecase: CreateTransactionUseCase
  let transactionRepository: TransactionRepository
  let categoryRepository: CategoryRepository

  let payload = {
    value: 100,
    description: 'any_description',
    type: 'income',
    userId: 'any_user_id',
    date: new Date()
  } as any

  beforeEach(async () => {
    transactionRepository = new InMemoryTransactionRepository()
    categoryRepository = new InMemoryCategoryRepository()

    const category = await categoryRepository.findByName('Alimentação')

    payload = {
      ...payload,
      categoryId: category.id
    }

    usecase = new CreateTransactionUseCase(transactionRepository, categoryRepository)
  })

  it('should create a transaction', async () => {
    const transaction = await usecase.execute(payload)

    expect(transaction).toBeDefined()
    expect(transaction.id).toBeDefined()
    expect(transaction.value).toBe(payload.value)
    expect(transaction.description).toBe(payload.description)
    expect(transaction.type).toBe(TransactionType.INCOME)
    expect(transaction.userId).toBe(payload.userId)
    expect(transaction.date).toStrictEqual(payload.date)
    expect(transaction.createdAt).toBeDefined()
    expect(transaction.updatedAt).toBeDefined()
  })

  it('should create a transaction - expense type', async () => {
    const transaction = await usecase.execute({
      ...payload,
      type: 'expense'
    })

    expect(transaction).toBeDefined()
    expect(transaction.id).toBeDefined()
    expect(transaction.value).toBe(payload.value)
    expect(transaction.description).toBe(payload.description)
    expect(transaction.type).toBe(TransactionType.EXPENSE)
    expect(transaction.userId).toBe(payload.userId)
    expect(transaction.date).toStrictEqual(payload.date)
    expect(transaction.createdAt).toBeDefined()
    expect(transaction.updatedAt).toBeDefined()
  })

  it('should create a transaction - with person id', async () => {
    const transaction = await usecase.execute({
      ...payload,
      personId: 'any_person_id'
    })

    expect(transaction).toBeDefined()
    expect(transaction.id).toBeDefined()
    expect(transaction.value).toBe(payload.value)
    expect(transaction.description).toBe(payload.description)
    expect(transaction.type).toBe(TransactionType.INCOME)
    expect(transaction.userId).toBe(payload.userId)
    expect(transaction.date).toStrictEqual(payload.date)
    expect(transaction.createdAt).toBeDefined()
    expect(transaction.updatedAt).toBeDefined()
  })

  it('should create a recurring transaction', async () => {
    const transactions = await usecase.execute({
      ...payload,
      isRecurring: true,
      recurringTimes: 3
    })

    expect(transactions.length).toBe(3)

    expect(transactions[0].date).toStrictEqual(payload.date)
    expect(transactions[1].date).toStrictEqual(new Date(new Date(payload.date).setMonth(new Date(payload.date).getMonth() + 1)))
    expect(transactions[2].date).toStrictEqual(new Date(new Date(payload.date).setMonth(new Date(payload.date).getMonth() + 2)))
  })

  it('should throw if category is not found', async () => {
    const invalidPayload = {
      ...payload,
      categoryId: 'invalid_category_id'
    }

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('Category not found')
  })

  it('should throw if pass isRecurring as true and recurringTimes as undefined', async () => {
    const invalidPayload = {
      ...payload,
      isRecurring: true,
      recurringTimes: undefined
    }

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('Recurring times must be provided')
  })

  it('should throw if recurringTimes is not a number', async () => {
    const invalidPayload = {
      ...payload,
      isRecurring: true,
      recurringTimes: 'invalid_recurring_times' as any
    }

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('Recurring times must be a number')
  })

  it('should throw if recurringTimes is negative', async () => {
    const invalidPayload = {
      ...payload,
      isRecurring: true,
      recurringTimes: -1
    }

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('Recurring times must be greater than zero')
  })

  it('should throw if value is not a number', async () => {
    const invalidPayload = {
      ...payload,
      value: 'invalid_value' as any
    }

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('Value must be a number')
  })

  it('should throw if value is negative', async () => {
    const invalidPayload = {
      ...payload,
      value: -1
    }

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('Value must be greater than zero')
  })

  it('should throw if description is not a string', async () => {
    const invalidPayload = {
      ...payload,
      description: 123 as any
    }

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('Description must be a string')
  })

  it('should throw if date is not a date', async () => {
    const invalidPayload = {
      ...payload,
      date: 'invalid_date' as any
    }

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('Date must be a date')
  })

  it('should throw if type is not a string', async () => {
    const invalidPayload = {
      ...payload,
      type: 123 as any
    }

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('Type must be a string')
  })

  it('should throw if type is not income or expense', async () => {
    const invalidPayload = {
      ...payload,
      type: 'invalid_type'
    }

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('Type must be income or expense')
  })

  it('should throw if user id is not a string', async () => {
    const invalidPayload = {
      ...payload,
      userId: 123 as any
    }

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('User id must be a string')
  })

  it('should throw if any required field is missing', async () => {
    const invalidPayload = {
      ...payload,
      value: undefined,
      description: undefined,
      type: undefined,
      userId: undefined,
      date: undefined
    } as any

    await expect(usecase.execute(invalidPayload)).rejects.toThrow('Missing required fields')
  })
})
