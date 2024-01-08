import { User } from '@core/domain/entities/user.entity'
import { OtpRepository } from '@core/domain/repositories/otp-repository.interface'
import { UserRepository } from '@core/domain/repositories/user-repository.interface'
import { InMemoryOtpRepository } from '@test/repositories/in-memory-otp-repository'
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOtpUseCase } from './create-otp.usecase'

describe('create otp usecase', () => {
  let usecase: CreateOtpUseCase
  let otpRepository: OtpRepository
  let userRepository: UserRepository

  let user: User

  beforeEach(async () => {
    otpRepository = new InMemoryOtpRepository()
    userRepository = new InMemoryUserRepository()

    user = User.create({
      name: 'test',
      email: 'any@email.com',
    })

    userRepository.create(user)

    usecase = new CreateOtpUseCase(userRepository, otpRepository)
  })

  it('should create otp', async () => {
    const otp = await usecase.execute({
      email: user.email,
    })

    expect(otp.code).toBeDefined()
    expect(otp.userId).toBe(user.id)
  })

  it('should throw error if user does not exists', async () => {
    await expect(
      usecase.execute({
        email: 'invalid_email',
      })
    ).rejects.toThrowError('User not found')
  })

  it('should hash otp code', async () => {
    const otp = await usecase.execute({
      email: user.email,
    })

    expect(otp.code).not.toBe('123456')
  })
})
