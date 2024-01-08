import { CreateUserController } from "@core/application/usecases/users/create-user.controller";
import { CreateUserUseCase } from "@core/application/usecases/users/create-user.usecase";
import { prisma } from "@infra/database/prisma";
import { PrismaUserRepository } from "@infra/database/prisma/repositories/prisma-user.repository";


export function makeCreateUserController() {
  const prismaUserRepository = new PrismaUserRepository(prisma);
  const createUserUseCase = new CreateUserUseCase(prismaUserRepository);

  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}