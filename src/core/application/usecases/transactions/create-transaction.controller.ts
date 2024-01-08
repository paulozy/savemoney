import { HttpResponse, clientError, created, fail } from "@infra/http/http-reponse";
import { CreateTransactionUseCase } from "./create-transaction.usecase";

export type CreateTransactionControllerRequest = {
  value: number;
  description: string;
  type: string;
  userId: string;
  date: Date;
  personId?: string;
  categoryId?: string;
  isRecurring?: boolean;
  recurringTimes?: number;
}

export class CreateTransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase
  ) { }

  async handle(request: CreateTransactionControllerRequest): Promise<HttpResponse> {
    try {
      const { value, date, description, type, userId, categoryId, personId, recurringTimes, isRecurring } = request;

      const normalizedDate = new Date(date);

      const transaction = await this.createTransactionUseCase.execute({
        value,
        date: normalizedDate,
        description,
        type,
        userId,
        categoryId,
        personId,
        recurringTimes,
        isRecurring
      });

      return created(transaction);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return clientError(error);
      }

      return fail(error);
    }
  }
}