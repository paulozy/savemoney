import { describe, expect, it } from 'vitest'
import { Category } from './category.entity'

describe('category entity', () => {
  it('should create a category', () => {
    const category = Category.create({
      name: 'Category',
      description: 'Category description',
      userId: 'user-id'
    })

    expect(category.id).toBeDefined()
    expect(category.name).toBe('Category')
    expect(category.description).toBe('Category description')
    expect(category.userId).toBe('user-id')
    expect(category.createdAt).toBeDefined()
    expect(category.updatedAt).toBeDefined()
  })

  it('should update a category', () => {
    const category = Category.create({
      name: 'Category',
      description: 'Category description',
      userId: 'user-id'
    })

    const updatedCategory = category.update({
      name: 'Updated category',
      description: 'Updated category description'
    })

    expect(updatedCategory.id).toBe(category.id)
    expect(updatedCategory.name).toBe('Updated category')
    expect(updatedCategory.description).toBe('Updated category description')
    expect(updatedCategory.userId).toBe('user-id')
  })

  it('should be possible create a category with id', () => {
    const category = Category.create({
      id: 'category-id',
      name: 'Category',
      description: 'Category description',
      userId: 'user-id'
    })

    expect(category.id).toBe('category-id')
    expect(category.name).toBe('Category')
    expect(category.description).toBe('Category description')
    expect(category.userId).toBe('user-id')
    expect(category.createdAt).toBeDefined()
    expect(category.updatedAt).toBeDefined()
  })

  it('should be possible convert a category to json', () => {
    const category = Category.create({
      id: 'category-id',
      name: 'Category',
      description: 'Category description',
      userId: 'user-id'
    })

    const json = category.toJSON()

    expect(json.id).toBe('category-id')
    expect(json.name).toBe('Category')
    expect(json.description).toBe('Category description')
    expect(json.userId).toBe('user-id')
    expect(json.createdAt).toBeDefined()
    expect(json.updatedAt).toBeDefined()
  })
})
