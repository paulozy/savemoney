import { Category } from "@core/domain/entities/category.entity";
import { Category as RawCategory } from '@prisma/client';

export class CategoryMapper {
  static toDomain(categoryData: RawCategory): Category {
    const category = Category.create({
      id: categoryData.id,
      name: categoryData.name,
      description: categoryData.description,
      userId: categoryData.userId,
      createdAt: new Date(categoryData.createdAt).getTime(),
      updatedAt: new Date(categoryData.updatedAt).getTime(),
    });

    return category;
  }

  static toPersistence(category: Category): RawCategory {
    const rawData = category.toJSON();

    return {
      id: rawData.id,
      name: rawData.name,
      description: rawData.description,
      userId: rawData.userId,
      createdAt: new Date(rawData.createdAt),
      updatedAt: new Date(rawData.updatedAt),
    }
  }
}