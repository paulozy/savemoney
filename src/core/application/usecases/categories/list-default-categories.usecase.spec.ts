import { CategoryRepository } from '@core/domain/repositories/category-repository.interface'
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListDefaultCategoriesUseCase } from './list-default-categories.usecase'

describe('create category usecase', () => {
  let usecase: ListDefaultCategoriesUseCase
  let categoryRepository: CategoryRepository

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository()
    usecase = new ListDefaultCategoriesUseCase(categoryRepository)
  })

  it('should list default categories', async () => {
    const categories = await usecase.execute()

    expect(categories).toHaveLength(10)
  })

  it('should return categories with id, name and description', async () => {
    const categories = await usecase.execute()

    categories.forEach(category => {
      expect(category).toHaveProperty('id')
      expect(category).toHaveProperty('name')
      expect(category).toHaveProperty('description')
    })
  })

  it('should return categories with createdAt and updatedAt', async () => {
    const categories = await usecase.execute()

    categories.forEach(category => {
      expect(category).toHaveProperty('createdAt')
      expect(category).toHaveProperty('updatedAt')
    })
  })
})
