import { ListTransactionsByUserController } from "@core/application/usecases/transactions/list-transactions-by-user.controller";
import { ListTransactionsByUserUseCase } from "@core/application/usecases/transactions/list-transactions-by-user.usecase";
import { prisma } from "@infra/database/prisma";
import { PrismaTransactionRepository } from "@infra/database/prisma/repositories/prisma-transaction.repository";

export function makeListTransactionsByUserController(): ListTransactionsByUserController {
  const prismaTransactionRepository = new PrismaTransactionRepository(prisma);

  const listTransactionsByUserUseCase = new ListTransactionsByUserUseCase(prismaTransactionRepository);

  const listTransactionsByUserController = new ListTransactionsByUserController(
    listTransactionsByUserUseCase,
  );

  return listTransactionsByUserController;
}