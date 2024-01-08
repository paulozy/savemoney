import { Category } from '@core/domain/entities/category.entity'
import { CategoryRepository } from '@core/domain/repositories/category-repository.interface'
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteCategoryUseCase } from './delete-category.usecase'

describe('delete category usecase', () => {
  let usecase: DeleteCategoryUseCase
  let categoryRepository: CategoryRepository
  let category: Category

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository()

    category = Category.create({
      name: 'any_name',
      description: 'any_description',
      userId: 'any_user_id'
    })

    categoryRepository.create(category)

    usecase = new DeleteCategoryUseCase(categoryRepository)
  })

  it('should delete a category', async () => {
    await usecase.execute({ id: category.id })

    const categoryExists = await categoryRepository.exists({ id: category.id })

    expect(categoryExists).toBeFalsy()
  })

  it('should throw if category id is not provided', async () => {
    await expect(usecase.execute({ id: undefined })).rejects.toThrow('Category id is required')
  })

  it('should throw if category id is not a string', async () => {
    await expect(usecase.execute({ id: 123 as any })).rejects.toThrow('Category id must be a string')
  })

  it('should throw if category does not exist', async () => {
    await expect(usecase.execute({ id: 'any_id' })).rejects.toThrow('Category not found')
  })
})
