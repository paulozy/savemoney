import { auth } from "@core/config/auth"
import { OtpRepository } from "@core/domain/repositories/otp-repository.interface"
import { UserRepository } from "@core/domain/repositories/user-repository.interface"
import { compare } from 'bcrypt'
import { sign } from "jsonwebtoken"

export type VerifyOtpCodeUseCaseRequest = {
  email: string
  code: string
}

export class VerifyOtpCodeUseCase {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async execute({ email, code }: VerifyOtpCodeUseCaseRequest) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    const otp = await this.otpRepository.getOneByUserId({ userId: user.id })
    const isValidCode = otp && (await this.compare(code, otp.code))
    const isValidOtp = isValidCode && otp.expiresAt > Date.now()

    if (!isValidOtp) {
      throw new Error('Invalid code')
    }

    await this.otpRepository.delete(otp.code)


    console.log(auth)

    const token = sign({}, auth.secret, {
      subject: user.id,
      expiresIn: auth.expiresIn,
    })

    return { token }
  }

  private async compare(code: string, hashedCode: string): Promise<boolean> {
    const isValid = await compare(code, hashedCode)

    return isValid
  }
}