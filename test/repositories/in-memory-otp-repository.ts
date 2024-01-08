import { Otp } from "@core/domain/entities/otp.entity";
import { GetByUserIdAndCodeInput, OtpRepository } from "@core/domain/repositories/otp-repository.interface";

export class InMemoryOtpRepository implements OtpRepository {
  opts: Otp[] = []

  async create(otp: Otp): Promise<string> {
    this.opts.push(otp)
    return otp.code
  }

  async getOneByUserId({ userId }: GetByUserIdAndCodeInput): Promise<Otp> {
    return this.opts.find((otp) => otp.userId === userId)
  }

  async delete(code: string): Promise<void> {
    this.opts = this.opts.filter((otp) => otp.code !== code)
  }
}