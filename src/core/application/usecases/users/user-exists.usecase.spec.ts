import { User } from '@core/domain/entities/user.entity'
import { UserRepository } from '@core/domain/repositories/user-repository.interface'
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserExistsUseCase } from './user-exists.usecase'

describe('user exists usecase', () => {
  let usecase: UserExistsUseCase
  let userRepository: UserRepository

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()

    userRepository.create(
      User.create({
        name: 'test',
        email: 'any@email.com',
      })
    )

    usecase = new UserExistsUseCase(userRepository)
  })

  it('should return true if user exists', async () => {
    const userExists = await usecase.execute({
      email: 'any@email.com',
    })

    expect(userExists).toBe(true)
  })

  it('should return false if user does not exists', async () => {
    const userExists = await usecase.execute({
      email: 'invalid_email',
    })

    expect(userExists).toBe(false)
  })
})
