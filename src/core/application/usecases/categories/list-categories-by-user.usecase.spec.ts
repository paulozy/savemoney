import { Category } from '@core/domain/entities/category.entity'
import { CategoryRepository } from '@core/domain/repositories/category-repository.interface'
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListCategoriesByUserUseCase } from './list-categories-by-user.usecase'

describe('create category usecase', () => {
  let usecase: ListCategoriesByUserUseCase
  let categoryRepository: CategoryRepository

  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository()

    for (let i = 0; i < 5; i++) {
      categoryRepository.create(
        Category.create({
          name: `Category ${i}`,
          description: `Category ${i} description`,
          userId: i % 2 === 0 ? '1' : '2'
        })
      )
    }

    usecase = new ListCategoriesByUserUseCase(categoryRepository)
  })

  it('should list categories by user', async () => {
    const categories = await usecase.execute({
      userId: '1'
    })

    expect(categories).toHaveLength(3)
  })

  it('should list categories by user and name', async () => {
    const categories = await usecase.execute({
      userId: '1',
      name: 'Category 2'
    })

    expect(categories).toHaveLength(1)
  })

  it('should list categories by user and description', async () => {
    const categories = await usecase.execute({
      userId: '1',
      description: 'Category 2 description'
    })

    expect(categories).toHaveLength(1)
  })

  it('should list categories by user and sort asc', async () => {
    const categories = await usecase.execute({
      userId: '1',
      sort: 'asc'
    })

    expect(categories[0].name).toBe('Category 0')
  })

  it('should list categories by user and sort desc', async () => {
    const categories = await usecase.execute({
      userId: '1',
      sort: 'desc'
    })

    expect(categories[0].name).toBe('Category 0')
  })

  it('should list categories by user and page/limit', async () => {
    const categories = await usecase.execute({
      userId: '1',
      page: 2,
      limit: 2
    })

    expect(categories).toHaveLength(1)
  })

  it('should throw error if userId is not provided', async () => {
    await expect(usecase.execute({} as any)).rejects.toThrow('Missing required fields')
  })

  it('should throw error if userId is not string', async () => {
    await expect(usecase.execute({ userId: 1 } as any)).rejects.toThrow('Invalid field type')
  })

  it('should throw error if name is not string', async () => {
    await expect(usecase.execute({ userId: '1', name: 1 } as any)).rejects.toThrow('Invalid field type')
  })

  it('should throw error if description is not string', async () => {
    await expect(usecase.execute({ userId: '1', description: 1 } as any)).rejects.toThrow('Invalid field type')
  })

  it('should throw error if sort is not asc or desc', async () => {
    await expect(usecase.execute({ userId: '1', sort: 'invalid' } as any)).rejects.toThrow('Invalid field value')
  })

  it('should throw error if page is not number', async () => {
    await expect(usecase.execute({ userId: '1', page: 'invalid' } as any)).rejects.toThrow('Invalid field type')
  })

  it('should throw error if limit is not number', async () => {
    await expect(usecase.execute({ userId: '1', limit: 'invalid' } as any)).rejects.toThrow('Invalid field type')
  })
})
