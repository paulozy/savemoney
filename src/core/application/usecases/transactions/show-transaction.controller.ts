import { clientError, fail, ok } from "@infra/http/http-reponse";
import { ShowTransactionUseCase } from "./show-transaction.usecase";

export type ShowTransactionControllerRequest = {
  id: string;
}

export class ShowTransactionController {
  constructor(
    private readonly showTransactionUseCase: ShowTransactionUseCase
  ) { }

  async handle(request: ShowTransactionControllerRequest) {
    try {
      const { id } = request;

      const transaction = await this.showTransactionUseCase.execute({ id });

      return ok(transaction);
    } catch (error) {
      if (error instanceof Error) {
        return clientError(error);
      }

      return fail(error);
    }
  }
}