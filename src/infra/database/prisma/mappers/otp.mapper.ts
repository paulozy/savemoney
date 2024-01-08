import { Otp } from '@core/domain/entities/otp.entity';
import { Otp as RawOtp } from '@prisma/client';

export class OtpMapper {
  static toDomain(otpData: RawOtp): Otp {
    const otp = Otp.create({
      code: otpData.code,
      userId: otpData.userId,
      expiresAt: new Date(otpData.expiresAt).getTime(),
      createdAt: new Date(otpData.createdAt).getTime(),
      updatedAt: new Date(otpData.updatedAt).getTime(),
    });

    return otp;
  }

  static toPersistence(otp: Otp): RawOtp {
    const rawData = otp.toJSON();

    return {
      id: null,
      code: rawData.code,
      userId: rawData.userId,
      expiresAt: rawData.expiresAt,
      createdAt: new Date(rawData.createdAt),
      updatedAt: new Date(rawData.updatedAt),
    }
  }
}