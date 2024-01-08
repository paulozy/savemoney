import { describe, expect, it } from 'vitest'
import { Otp } from './otp.entity'

describe('otp entity', () => {
  it('should create a otp', () => {
    const otp = Otp.create({
      userId: 'user-id',
      code: '123456',
      expiresAt: Date.now() + 1000 * 60 * 60 // 1 hour
    })

    expect(otp.userId).toBe('user-id')
    expect(otp.code).toBe('123456')
    expect(otp.expiresAt).toBeDefined()
    expect(otp.createdAt).toBeDefined()
    expect(otp.updatedAt).toBeDefined()
  })
})
