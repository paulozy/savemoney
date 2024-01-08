import { Otp } from "@core/domain/entities/otp.entity"
import { OtpRepository } from "@core/domain/repositories/otp-repository.interface"
import { UserRepository } from "@core/domain/repositories/user-repository.interface"
import { hash } from "bcrypt"

export type CreateOtpUseCaseInput = {
  email: string
}

export class CreateOtpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OtpRepository
  ) { }

  async execute({ email }: CreateOtpUseCaseInput) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    const code = this.generateCode()
    const hashedCode = await this.hash(code)

    const otp = Otp.create({
      userId: user.id,
      code: hashedCode,
      expiresAt: Date.now() + 1000 * 60 * 60 // 1 hour
    })

    await this.otpRepository.create(otp)

    return {
      ...otp.toJSON(),
      code
    }
  }

  private generateCode(): string {
    const code = Math.floor(10000 + Math.random() * 90000).toString()

    return code
  }

  private async hash(code: string): Promise<string> {
    const hashedCode = await hash(code, 10)

    return hashedCode
  }
}