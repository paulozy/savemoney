import { UpdateTransactionController } from "@core/application/usecases/transactions/update-transaction.controller";
import { UpdateTransactionUseCase } from "@core/application/usecases/transactions/update-transaction.usecase";
import { prisma } from "@infra/database/prisma";
import { PrismaCategoryRepository } from "@infra/database/prisma/repositories/prisma-category-repository";
import { PrismaTransactionRepository } from "@infra/database/prisma/repositories/prisma-transaction.repository";

export function makeUpdateTransactionController(): UpdateTransactionController {
  const prismaTransactionRepository = new PrismaTransactionRepository(prisma);
  const prismaCategoryRepository = new PrismaCategoryRepository(prisma);

  const updateTransactionUseCase = new UpdateTransactionUseCase(
    prismaTransactionRepository,
    prismaCategoryRepository
  );

  const updateTransactionController = new UpdateTransactionController(
    updateTransactionUseCase,
  );

  return updateTransactionController;
}