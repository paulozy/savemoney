import { Otp } from "../entities/otp.entity";

export type GetByUserIdAndCodeInput = {
  userId: string;
}

export interface OtpRepository {
  create(otp: Otp): Promise<string>;
  getOneByUserId(input: GetByUserIdAndCodeInput): Promise<Otp>;
  delete(code: string): Promise<void>;
}