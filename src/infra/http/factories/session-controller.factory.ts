import { CreateOtpController } from "@core/application/usecases/otp/create-otp.controller";
import { CreateOtpUseCase } from "@core/application/usecases/otp/create-otp.usecase";
import { VerifyOtpCodeController } from "@core/application/usecases/otp/verify-otp-code.controller";
import { VerifyOtpCodeUseCase } from "@core/application/usecases/otp/verify-otp-code.usecase";
import { prisma } from "@infra/database/prisma";
import { PrismaOtpRepository } from "@infra/database/prisma/repositories/prisma-otp.repository";
import { PrismaUserRepository } from "@infra/database/prisma/repositories/prisma-user.repository";
import { transporter } from "@infra/gateways/mailer";
import { MailerProvider } from "@infra/gateways/mailer/mailer.gateway";

export function makeSessionController() {
  const prismaOtpRepository = new PrismaOtpRepository(prisma);
  const prismaUserRepository = new PrismaUserRepository(prisma);
  const createOtpUseCase = new CreateOtpUseCase(prismaUserRepository, prismaOtpRepository);

  const mailerProvider = new MailerProvider(transporter);

  const createOtpController = new CreateOtpController(createOtpUseCase, mailerProvider);
  const verifyOtpCodeUseCase = new VerifyOtpCodeUseCase(prismaOtpRepository, prismaUserRepository);

  const verifyOtpCodeController = new VerifyOtpCodeController(verifyOtpCodeUseCase);

  return {
    createOtpController,
    verifyOtpCodeController
  }
}