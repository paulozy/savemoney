import { Category } from "@core/domain/entities/category.entity";
import { CategoryRepository, ExistsInput, FindByUserIdInput } from "@core/domain/repositories/category-repository.interface";
import { PrismaClient } from "@prisma/client";
import { CategoryMapper } from "../mappers/category.mapper";

export class PrismaCategoryRepository implements CategoryRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) { }

  async exists({ name, id }: ExistsInput): Promise<boolean> {
    const category = await this.prisma.category.findFirst({
      where: {
        OR: [
          { name },
          { id }
        ]
      }
    });

    return !!category;
  }

  async create(category: Category): Promise<Category> {
    const rawData = CategoryMapper.toPersistence(category);

    const createdCategory = await this.prisma.category.create({
      data: {
        name: rawData.name,
        description: rawData.description,
        userId: rawData.userId,
        createdAt: rawData.createdAt,
        updatedAt: rawData.updatedAt,
      }
    });

    return CategoryMapper.toDomain(createdCategory);
  }

  async save(category: Category): Promise<Category> {
    const rawData = CategoryMapper.toPersistence(category);

    const updatedCategory = await this.prisma.category.update({
      where: {
        id: rawData.id
      },
      data: rawData
    });

    return CategoryMapper.toDomain(updatedCategory);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: {
        id
      }
    });
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      }
    });

    if (!category) {
      return null;
    }

    return CategoryMapper.toDomain(category);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.prisma.category.findFirst({
      where: {
        name
      }
    });

    return CategoryMapper.toDomain(category);
  }

  async findByUserId(input: FindByUserIdInput): Promise<Category[]> {
    const { userId, description, limit, name, page, sort } = input;

    const categories = await this.prisma.category.findMany({
      where: {
        userId,
        description: {
          contains: description
        },
      },
      skip: page * limit,
      take: limit
    });

    return categories.map(category => CategoryMapper.toDomain(category));
  }

  async findDefaultCategories(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        userId: null
      }
    });

    return categories.map(category => Category.create({
      ...category,
      createdAt: category.createdAt.getTime(),
      updatedAt: category.updatedAt.getTime(),
    }));
  }
}