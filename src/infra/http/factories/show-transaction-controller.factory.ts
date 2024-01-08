import { ShowTransactionController } from "@core/application/usecases/transactions/show-transaction.controller";
import { ShowTransactionUseCase } from "@core/application/usecases/transactions/show-transaction.usecase";
import { prisma } from "@infra/database/prisma";
import { PrismaTransactionRepository } from "@infra/database/prisma/repositories/prisma-transaction.repository";

export function makeShowTransactionController(): ShowTransactionController {
  const prismaTransactionRepository = new PrismaTransactionRepository(prisma);

  const showTransactionUseCase = new ShowTransactionUseCase(prismaTransactionRepository);

  const showTransactionController = new ShowTransactionController(
    showTransactionUseCase,
  );

  return showTransactionController;
}