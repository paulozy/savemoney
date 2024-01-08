import { CategoryRepository } from '@core/domain/repositories/category-repository.interface'
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCategoryUseCase } from './create-category.usecase'

describe('create category usecase', () => {
  let usecase: CreateCategoryUseCase
  let categoryRepository: CategoryRepository

  const payload = {
    name: 'Entretenimento',
    description: 'Despesas com entretenimento, hobbies e viagens',
    userId: 'any_user_id'
  }

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository()
    usecase = new CreateCategoryUseCase(categoryRepository)
  })

  it('should create a category', async () => {
    const category = await usecase.execute(payload)

    expect(category).toEqual({
      id: expect.any(String),
      name: payload.name,
      description: payload.description,
      userId: payload.userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })

  it('should throw an error if name is not provided', async () => {
    const promise = usecase.execute({ ...payload, name: '' })

    await expect(promise).rejects.toThrow('Category name is required')
  })

  it('should throw an error if name is not a string', async () => {
    const promise = usecase.execute({ ...payload, name: 123 } as any)

    await expect(promise).rejects.toThrow('Category name must be a string')
  })

  it('should throw an error if description is not provided', async () => {
    const promise = usecase.execute({ ...payload, description: '' })

    await expect(promise).rejects.toThrow('Category description is required')
  })

  it('should throw an error if description is not a string', async () => {
    const promise = usecase.execute({ ...payload, description: 123 } as any)

    await expect(promise).rejects.toThrow('Category description must be a string')
  })

  it('should throw an error if userId is not provided', async () => {
    const promise = usecase.execute({ ...payload, userId: '' })

    await expect(promise).rejects.toThrow('Category user id is required')
  })

  it('should throw an error if userId is not a string', async () => {
    const promise = usecase.execute({ ...payload, userId: 123 } as any)

    await expect(promise).rejects.toThrow('Category user id must be a string')
  })

  it('should throw an error if category already exists', async () => {
    await usecase.execute(payload)

    const promise = usecase.execute({
      ...payload,
      name: 'Alimentação'
    })

    await expect(promise).rejects.toThrow('Category already exists')
  })
})
