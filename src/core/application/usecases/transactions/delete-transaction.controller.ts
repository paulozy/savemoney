import { HttpResponse, clientError, fail, ok } from "@infra/http/http-reponse";
import { DeleteTransactionUseCase } from "./delete-transaction.usecase";

export type DeleteTransactionControllerRequest = {
  id: string;
};

export class DeleteTransactionController {
  constructor(
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase
  ) { }

  async handle(request: DeleteTransactionControllerRequest): Promise<HttpResponse> {
    try {
      const { id } = request;

      await this.deleteTransactionUseCase.execute({ id });

      return ok()
    } catch (error) {
      if (error instanceof Error) {
        return clientError(error);
      }

      return fail(error);
    }
  }
}