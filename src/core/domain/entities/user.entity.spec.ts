import { describe, expect, it } from 'vitest'
import { User } from './user.entity'

describe('user entity', () => {
  const payload = {
    name: 'test',
    email: 'any@email.com',
  }

  it('should be possible create a new user', () => {
    const user = User.create(payload)

    expect(user).toBeDefined()
    expect(user.id).toBeDefined()
    expect(user.name).toBe('test')
    expect(user.email).toBe(user.email)
    expect(user.createdAt).toBeDefined()
    expect(user.updatedAt).toBeDefined()
  })

  it.only('should be possible update a user', () => {
    const user = User.create(payload)

    user.update({
      name: 'test2',
    })

    expect(user.name).toBe('test2')
  })

  it('should be possible create a new user with id', () => {
    const user = User.create({
      id: '123',
      ...payload,
    })

    expect(user).toBeDefined()
    expect(user.id).toBe('123')
    expect(user.name).toBe('test')
    expect(user.email).toBe(user.email)
    expect(user.createdAt).toBeDefined()
    expect(user.updatedAt).toBeDefined()
  })

  it('should throw if invalid email', () => {
    expect(() => {
      User.create({
        ...payload,
        email: 'invalid_email',
      })
    }).toThrow()
  })
})
