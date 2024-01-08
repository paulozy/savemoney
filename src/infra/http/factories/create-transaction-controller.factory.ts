import { CreateTransactionController } from "@core/application/usecases/transactions/create-transaction.controller";
import { CreateTransactionUseCase } from "@core/application/usecases/transactions/create-transaction.usecase";
import { prisma } from "@infra/database/prisma";
import { PrismaCategoryRepository } from "@infra/database/prisma/repositories/prisma-category-repository";
import { PrismaTransactionRepository } from "@infra/database/prisma/repositories/prisma-transaction.repository";

export function makeCreateTransactionController(): CreateTransactionController {
  const prismaTransactionRepository = new PrismaTransactionRepository(prisma);
  const prismaCategoryRepository = new PrismaCategoryRepository(prisma);

  const createTransactionUseCase = new CreateTransactionUseCase(prismaTransactionRepository, prismaCategoryRepository);

  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase,
  );

  return createTransactionController;
}