import { Mailer } from "@core/domain/gateways/mailer.interface";
import { HttpResponse, clientError, fail, ok } from "@infra/http/http-reponse";
import { getOtpEmailTemplate } from "@templates/otp-email";
import { CreateOtpUseCase } from "./create-otp.usecase";

export type CreateOtpControllerRequest = {
  email: string
}

export class CreateOtpController {
  constructor(
    private readonly createOtpUseCase: CreateOtpUseCase,
    private readonly mailer: Mailer
  ) { }

  async handle({ email }: CreateOtpControllerRequest): Promise<HttpResponse> {
    try {
      const otp = await this.createOtpUseCase.execute({ email })

      await this.mailer.send({
        to: email,
        subject: 'Your verification code',
        body: getOtpEmailTemplate(otp.code)
      })

      return ok({ message: 'Verification code sent' })
    } catch (error) {
      console.log(error)

      if (error instanceof Error) {
        return clientError(error);
      }

      return fail(error);
    }
  }
}
