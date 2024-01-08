import { clientError, fail, ok } from "@infra/http/http-reponse";
import { ListTransactionsByUserUseCase } from "./list-transactions-by-user.usecase";

export type ListTransactionsByUserControllerRequest = {
  userId: string;
  page?: number;
  limit?: number;
  sort?: string;
  value?: number;
  description?: string;
}

export class ListTransactionsByUserController {
  constructor(
    private readonly listTransactionsByUserUseCase: ListTransactionsByUserUseCase
  ) { }

  async handle(request: ListTransactionsByUserControllerRequest) {
    try {
      const { userId, page, limit, sort, value, description } = request;

      const transactions = await this.listTransactionsByUserUseCase.execute({
        userId,
        page,
        limit,
        sort,
        value,
        description
      });

      return ok(transactions);
    } catch (error) {
      if (error instanceof Error) {
        return clientError(error);
      }

      return fail(error);
    }
  }
}