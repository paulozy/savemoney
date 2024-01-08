import { Category } from '@core/domain/entities/category.entity'
import { Transaction, TransactionType } from '@core/domain/entities/transaction.entity'
import { CategoryRepository } from '@core/domain/repositories/category-repository.interface'
import { TransactionRepository } from '@core/domain/repositories/transaction-repository.interface'
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { InMemoryTransactionRepository } from '@test/repositories/in-memory-transaction-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateTransactionUseCase } from './update-transaction.usecase'

describe('update transaction usecase', () => {
  let usecase: UpdateTransactionUseCase
  let transactionRepository: TransactionRepository
  let categoryRepository: CategoryRepository
  let transaction: Transaction
  let category: Category

  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()
    categoryRepository = new InMemoryCategoryRepository()

    transaction = Transaction.create({
      value: 100,
      description: 'any_description',
      type: TransactionType.INCOME,
      userId: 'any_user_id',
      categoryId: 'any_category_id',
      date: new Date().getTime(),
    })

    transactionRepository.create(transaction)

    category = Category.create({
      name: 'any_name',
      userId: 'any_user_id',
      description: 'any_description',
    })

    categoryRepository.create(category)

    usecase = new UpdateTransactionUseCase(transactionRepository, categoryRepository)
  })

  it('should update transaction', async () => {
    const updatedTransaction = await usecase.execute({
      id: transaction.id,
      value: 200,
      description: 'updated_description',
      type: 'expense',
      date: new Date(),
    })

    expect(updatedTransaction.value).toBe(200)
    expect(updatedTransaction.description).toBe('updated_description')
    expect(updatedTransaction.type).toBe('EXPENSE')
  })

  it('should update transaction - income type', async () => {
    const updatedTransaction = await usecase.execute({
      id: transaction.id,
      value: 200,
      description: 'updated_description',
      type: 'income',
      date: new Date(),
    })

    expect(updatedTransaction.value).toBe(200)
    expect(updatedTransaction.description).toBe('updated_description')
    expect(updatedTransaction.type).toBe('INCOME')
  })

  it('should update transaction - with category', async () => {
    const updatedTransaction = await usecase.execute({
      id: transaction.id,
      categoryId: category.id,
    })

    expect(updatedTransaction.categoryId).toBe(category.id)
  })

  it('should not update transaction if category does not exists', async () => {
    await expect(
      usecase.execute({
        id: transaction.id,
        categoryId: 'any_id',
      })
    ).rejects.toThrow('Category not found')
  })

  it('should not update transaction if value is less than 0', async () => {
    await expect(
      usecase.execute({
        id: transaction.id,
        value: -1,
      })
    ).rejects.toThrow('Value must be greater than 0')
  })

  it('should not update transaction if description is less than 3 characters', async () => {
    await expect(
      usecase.execute({
        id: transaction.id,
        description: 'ab',
      })
    ).rejects.toThrow('Description must be greater than 3 characters')
  })

  it('should not update transaction if type is not income or expense', async () => {
    await expect(
      usecase.execute({
        id: transaction.id,
        type: 'any_type',
      })
    ).rejects.toThrow('Type must be income or expense')
  })

  it('should not update transaction if date is not a date', async () => {
    await expect(
      usecase.execute({
        id: transaction.id,
        date: 'any_date' as any,
      })
    ).rejects.toThrow('Date must be a date')
  })

  it('should not update transaction if transaction does not exists', async () => {
    await expect(
      usecase.execute({
        id: 'any_id',
      })
    ).rejects.toThrow('Transaction not found')
  })

  it('should not update transaction if id is not provided', async () => {
    await expect(
      usecase.execute({
        id: '',
      })
    ).rejects.toThrow('Id is required')
  })
})
