import { HttpResponse, clientError, fail, ok } from "@infra/http/http-reponse";
import { VerifyOtpCodeUseCase } from "./verify-otp-code.usecase";

export type VerifyOtpCodeControllerRequest = {
  email: string
  code: string
}

export class VerifyOtpCodeController {
  constructor(
    private readonly verifyOtpCodeUseCase: VerifyOtpCodeUseCase
  ) { }

  async handle({ email, code }: VerifyOtpCodeControllerRequest): Promise<HttpResponse> {
    try {
      const { token } = await this.verifyOtpCodeUseCase.execute({ email, code })

      return ok({ token })
    } catch (error) {
      if (error instanceof Error) {
        return clientError(error);
      }

      return fail(error);
    }
  }
}