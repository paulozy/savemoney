import { HttpResponse, clientError, created, fail } from "@infra/http/http-reponse";
import { CreateUserUseCase } from "./create-user.usecase";

export type CreateUserControllerRequest = {
  name: string;
  email: string;
}

export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) { }

  async handle(request: CreateUserControllerRequest): Promise<HttpResponse> {
    try {
      const { name, email } = request;

      const user = await this.createUserUseCase.execute({
        name,
        email
      });

      return created(user);
    } catch (error) {
      if (error instanceof Error) {
        return clientError(error);
      }

      return fail(error);
    }
  }
}