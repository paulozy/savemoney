import { User } from "@core/domain/entities/user.entity";
import { ExistsInput, UserRepository } from "@core/domain/repositories/user-repository.interface";
import { PrismaClient } from "@prisma/client";
import { UserMapper } from "../mappers/user.mapper";


export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) { }

  async exists({ email, id }: ExistsInput): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { id }
        ]
      }
    });

    return !!user;
  }

  async create(user: User): Promise<User> {
    const rawDate = UserMapper.toPersistence(user);

    const createdUser = await this.prisma.user.create({
      data: {
        name: rawDate.name,
        email: rawDate.email,
        createdAt: rawDate.createdAt,
        updatedAt: rawDate.updatedAt,
      },
    });

    return UserMapper.toDomain(createdUser);
  }

  async save(user: User): Promise<User> {
    const rawData = UserMapper.toPersistence(user);

    const updatedUser = await this.prisma.user.update({
      where: {
        id: rawData.id
      },
      data: rawData
    });

    return UserMapper.toDomain(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id
      }
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id
      }
    });

    return UserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    });

    return UserMapper.toDomain(user);
  }
}