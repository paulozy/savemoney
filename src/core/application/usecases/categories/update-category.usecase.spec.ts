import { Category } from '@core/domain/entities/category.entity'
import { CategoryRepository } from '@core/domain/repositories/category-repository.interface'
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateCategoryInput, UpdateCategoryUseCase } from './update-category.usecase'

describe('update category usecase', () => {
  let usecase: UpdateCategoryUseCase
  let categoryRepository: CategoryRepository
  let category: Category

  let payload = {
    name: 'Entretenimento',
    description: 'Despesas com entretenimento, hobbies e viagens',
  } as UpdateCategoryInput

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository()

    category = Category.create({
      name: 'any_name',
      description: 'any_description',
      userId: 'any_user_id'
    })

    payload.id = category.id

    categoryRepository.create(category)

    usecase = new UpdateCategoryUseCase(categoryRepository)
  })

  it('should update a category', async () => {
    const updatedCategory = await usecase.execute(payload)

    expect(updatedCategory).toEqual({
      id: category.id,
      name: payload.name,
      description: payload.description,
      userId: category.userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })

  it('should throw if category does not exists', async () => {
    await expect(usecase.execute({
      ...payload,
      id: 'any_id'
    })).rejects.toThrow('Category not found')
  })

  it('should throw if category id is not provided', async () => {
    await expect(usecase.execute({
      ...payload,
      id: undefined
    })).rejects.toThrow('Category id is required')
  })

  it('should throw if category id is not a string', async () => {
    await expect(usecase.execute({
      ...payload,
      id: 123 as any
    })).rejects.toThrow('Category id must be a string')
  })

  it('should throw if category name is not a string', async () => {
    await expect(usecase.execute({
      ...payload,
      name: 123 as any
    })).rejects.toThrow('Category name must be a string')
  })

  it('should throw if category description is not a string', async () => {
    await expect(usecase.execute({
      ...payload,
      description: 123 as any
    })).rejects.toThrow('Category description must be a string')
  })
})
