import { Otp } from '@core/domain/entities/otp.entity'
import { User } from '@core/domain/entities/user.entity'
import { OtpRepository } from '@core/domain/repositories/otp-repository.interface'
import { UserRepository } from '@core/domain/repositories/user-repository.interface'
import { InMemoryOtpRepository } from '@test/repositories/in-memory-otp-repository'
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository'
import { hash } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import { VerifyOtpCodeUseCase } from './verify-otp-code.usecase'

describe('verify otp usecase', () => {
  let usecase: VerifyOtpCodeUseCase
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

    const otp = Otp.create({
      userId: user.id,
      code: await hash('123456', 10),
      expiresAt: Date.now() + 1000 * 60 * 120, // 2 hours
    })

    await otpRepository.create(otp)

    usecase = new VerifyOtpCodeUseCase(otpRepository, userRepository)
  })

  it('should verify otp', async () => {
    const token = await usecase.execute({
      email: user.email,
      code: '123456',
    })

    expect(token).toBeDefined()
  })

  it('should throw error if user does not exists', async () => {
    await expect(
      usecase.execute({
        email: 'invalid_email@email.com',
        code: '123456',
      })
    ).rejects.toThrowError('User not found')
  })

  it('should throw error if otp is invalid', async () => {
    await expect(
      usecase.execute({
        email: user.email,
        code: 'invalid_code',
      })
    ).rejects.toThrowError('Invalid code')
  })

  it('should throw error if otp is expired', async () => {
    const otp = Otp.create({
      userId: user.id,
      code: await hash('654321', 10),
      expiresAt: new Date('2021-01-02').getTime(),
    })

    await otpRepository.create(otp)

    await expect(
      usecase.execute({
        email: user.email,
        code: '654321',
      })
    ).rejects.toThrowError('Invalid code')
  })
})
