import { clientError, fail, ok } from "@infra/http/http-reponse";
import { UpdateTransactionUseCase } from "./update-transaction.usecase";

export type UpdateTransactionControllerRequest = {
  id: string;
  categoryId?: string;
  value?: number;
  description?: string;
  date?: Date;
  type?: string;
}

export class UpdateTransactionController {
  constructor(
    private readonly updateTransactionUseCase: UpdateTransactionUseCase
  ) { }

  async handle(request: UpdateTransactionControllerRequest) {
    try {
      const { id, categoryId, value, description, date, type } = request;

      const transaction = await this.updateTransactionUseCase.execute({
        id,
        categoryId,
        value,
        description,
        date,
        type
      });

      return ok(transaction);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return clientError(error);
      }

      return fail(error);
    }
  }
}