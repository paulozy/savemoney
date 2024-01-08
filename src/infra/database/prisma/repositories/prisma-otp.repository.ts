import { Otp } from "@core/domain/entities/otp.entity";
import { GetByUserIdAndCodeInput, OtpRepository } from "@core/domain/repositories/otp-repository.interface";
import { PrismaClient } from "@prisma/client";
import { OtpMapper } from "../mappers/otp.mapper";

export class PrismaOtpRepository implements OtpRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) { }

  async create(otp: Otp): Promise<string> {
    const rawDate = otp.toJSON();

    const createdOtp = await this.prisma.otp.create({
      data: {
        userId: rawDate.userId,
        code: rawDate.code,
        expiresAt: rawDate.expiresAt,
        createdAt: rawDate.createdAt,
        updatedAt: rawDate.updatedAt,
      }
    });

    return createdOtp.code;
  }

  async getOneByUserId({ userId }: GetByUserIdAndCodeInput): Promise<Otp> {
    const otp = await this.prisma.otp.findFirst({
      where: {
        userId
      }
    });

    return OtpMapper.toDomain(otp);
  }

  async delete(code: string): Promise<void> {
    await this.prisma.otp.delete({
      where: {
        code
      }
    });
  }
}