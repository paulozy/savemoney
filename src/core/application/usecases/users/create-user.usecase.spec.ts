import { UserRepository } from '@core/domain/repositories/user-repository.interface'
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create-user.usecase'

describe('create user usecase', () => {
  let usecase: CreateUserUseCase
  let userRepository: UserRepository

  let payload = {
    name: 'test',
    email: 'any_email@email.com',
  } as any

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()

    usecase = new CreateUserUseCase(userRepository)
  })

  it('should create a user', async () => {
    const user = await usecase.execute(payload)

    expect(user).toBeDefined()
    expect(user.id).toBeDefined()
    expect(user.name).toBe('test')
    expect(user.email).toBe('any_email@email.com')
    expect(user.createdAt).toBeDefined()
    expect(user.updatedAt).toBeDefined()
  })

  it('should throw if invalid email', async () => {
    await expect(
      usecase.execute({
        ...payload,
        email: 'invalid_email',
      })
    ).rejects.toThrow()
  })

  it('should throw if user already exists', async () => {
    await usecase.execute(payload)

    await expect(
      usecase.execute({
        ...payload,
        name: 'other_name',
      })
    ).rejects.toThrow()
  })
})
