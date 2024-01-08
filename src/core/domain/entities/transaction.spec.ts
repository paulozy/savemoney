import { describe, expect, it } from 'vitest'
import { Transaction, TransactionType } from './transaction.entity'

describe('transaction entity', () => {
  it('should be possible create a new transaction', () => {
    const transaction = Transaction.create({
      value: 10,
      date: Date.now(),
      description: 'test',
      type: TransactionType.INCOME,
      categoryId: '123',
      userId: '123'
    })

    expect(transaction).toBeDefined()
    expect(transaction.id).toBeDefined()
    expect(transaction.value).toBe(10)
    expect(transaction.date).toBeDefined()
    expect(transaction.description).toBe('test')
    expect(transaction.type).toBe(TransactionType.INCOME)
    expect(transaction.userId).toBe('123')
  })

  it('should be possible create a new transaction with id', () => {
    const transaction = Transaction.create({
      id: '123',
      value: 10,
      date: Date.now(),
      description: 'test',
      type: TransactionType.INCOME,
      userId: '123',
      categoryId: '123',
    })

    expect(transaction).toBeDefined()
    expect(transaction.id).toBe('123')
    expect(transaction.value).toBe(10)
    expect(transaction.date).toBeDefined()
    expect(transaction.description).toBe('test')
    expect(transaction.type).toBe(TransactionType.INCOME)
    expect(transaction.userId).toBe('123')
  })

  it('should be possible update a transaction', () => {
    const transaction = Transaction.create({
      value: 10,
      date: Date.now(),
      description: 'test',
      type: TransactionType.INCOME,
      userId: '123',
      categoryId: '123',
    })

    transaction.update({
      value: 20,
      date: Date.now(),
      description: 'test2',
      type: TransactionType.EXPENSE
    })

    expect(transaction).toBeDefined()
    expect(transaction.id).toBeDefined()
    expect(transaction.value).toBe(20)
    expect(transaction.date).toBeDefined()
    expect(transaction.description).toBe('test2')
    expect(transaction.type).toBe(TransactionType.EXPENSE)
    expect(transaction.userId).toBe('123')
  })

  it('should be possible update a transaction with id', () => {
    const transaction = Transaction.create({
      id: '123',
      value: 10,
      date: Date.now(),
      description: 'test',
      type: TransactionType.INCOME,
      userId: '123',
      categoryId: '123',
    })

    transaction.update({
      value: 20,
      date: Date.now(),
      description: 'test2',
      type: TransactionType.EXPENSE
    })

    expect(transaction).toBeDefined()
    expect(transaction.id).toBe('123')
    expect(transaction.value).toBe(20)
    expect(transaction.date).toBeDefined()
    expect(transaction.description).toBe('test2')
    expect(transaction.type).toBe(TransactionType.EXPENSE)
    expect(transaction.userId).toBe('123')
  })

  it('should be possible convert a transaction to json', () => {
    const transaction = Transaction.create({
      value: 10,
      date: Date.now(),
      description: 'test',
      type: TransactionType.INCOME,
      userId: '123',
      categoryId: '123',
    })

    const json = transaction.toJSON()

    expect(json).toBeDefined()
    expect(json.id).toBeDefined()
    expect(json.value).toBe(10)
    expect(json.date).toBeDefined()
    expect(json.description).toBe('test')
    expect(json.type).toBe(TransactionType.INCOME)
    expect(json.userId).toBe('123')
  })
})
