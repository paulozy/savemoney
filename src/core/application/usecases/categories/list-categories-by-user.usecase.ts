import { CategoryRepository } from "@core/domain/repositories/category-repository.interface";

export type ListCategoriesByUserInput = {
  userId: string;
  name?: string;
  description?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export class ListCategoriesByUserUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(input: ListCategoriesByUserInput) {
    this.validateInput(input);

    const normalizedInput = this.normalizeInput(input);

    const categories = await this.categoryRepository.findByUserId(normalizedInput);

    return categories;
  }

  private validateInput(input: ListCategoriesByUserInput) {
    const { userId, name, description, sort, page, limit } = input;

    if (!userId) {
      throw new Error('Missing required fields');
    }

    if (typeof userId !== 'string') {
      throw new Error('Invalid field type');
    }

    if (name && typeof name !== 'string') {
      throw new Error('Invalid field type');
    }

    if (description && typeof description !== 'string') {
      throw new Error('Invalid field type');
    }

    if (sort && sort !== 'asc' && sort !== 'desc') {
      throw new Error('Invalid field value');
    }

    if (page && typeof page !== 'number') {
      throw new Error('Invalid field type');
    }

    if (limit && typeof limit !== 'number') {
      throw new Error('Invalid field type');
    }
  }

  private normalizeInput(input: ListCategoriesByUserInput) {
    const { userId, page, limit, sort, name, description } = input;

    return {
      userId,
      name,
      description,
      page: page || 1,
      limit: limit || 10,
      sort: sort || 'asc',
    }
  }
}