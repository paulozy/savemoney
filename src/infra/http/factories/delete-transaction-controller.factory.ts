import { DeleteTransactionController } from "@core/application/usecases/transactions/delete-transaction.controller";
import { DeleteTransactionUseCase } from "@core/application/usecases/transactions/delete-transaction.usecase";
import { prisma } from "@infra/database/prisma";
import { PrismaTransactionRepository } from "@infra/database/prisma/repositories/prisma-transaction.repository";

export function makeDeleteTransactionController(): DeleteTransactionController {
  const prismaTransactionRepository = new PrismaTransactionRepository(prisma);

  const deleteTransactionUseCase = new DeleteTransactionUseCase(prismaTransactionRepository);

  const deleteTransactionController = new DeleteTransactionController(
    deleteTransactionUseCase,
  );

  return deleteTransactionController;
}