import { Category } from "@core/domain/entities/category.entity";
import { CategoryRepository } from "@core/domain/repositories/category-repository.interface";

export type CreateCategoryInput = {
  name: string;
  description: string;
  userId: string;
}

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(input: CreateCategoryInput) {
    this.validateInput(input);

    const categoryExists = await this.categoryRepository.exists({ name: input.name });

    if (categoryExists) {
      throw new Error('Category already exists');
    }

    const category = Category.create(input);

    await this.categoryRepository.create(category);

    return category.toJSON();
  }

  private validateInput(input: CreateCategoryInput) {
    const { name, description, userId } = input;

    if (!name) {
      throw new Error('Category name is required');
    }

    if (typeof name !== 'string') {
      throw new Error('Category name must be a string');
    }

    if (!description) {
      throw new Error('Category description is required');
    }

    if (typeof description !== 'string') {
      throw new Error('Category description must be a string');
    }

    if (!userId) {
      throw new Error('Category user id is required');
    }

    if (typeof userId !== 'string') {
      throw new Error('Category user id must be a string');
    }
  }
}