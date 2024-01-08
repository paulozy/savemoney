import { CategoryRepository } from "@core/domain/repositories/category-repository.interface";

export type UpdateCategoryInput = {
  id: string;
  name?: string;
  description?: string;
};

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(input: UpdateCategoryInput) {
    this.validateInput(input);

    const { id } = input;

    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new Error('Category not found');
    }

    const normalizedInput = this.normalizeInput(input);

    category.update(normalizedInput);

    const updatedCategory = await this.categoryRepository.save(category);

    return updatedCategory.toJSON();
  }

  private validateInput(input: UpdateCategoryInput) {
    const { id, name, description } = input;

    if (!id) {
      throw new Error('Category id is required');
    }

    if (typeof id !== 'string') {
      throw new Error('Category id must be a string');
    }

    if (name && typeof name !== 'string') {
      throw new Error('Category name must be a string');
    }

    if (description && typeof description !== 'string') {
      throw new Error('Category description must be a string');
    }
  }

  private normalizeInput(input: UpdateCategoryInput) {
    const { name, description } = input;

    const normalizedName = name?.trim();
    const normalizedDescription = description?.trim();

    return {
      name: normalizedName,
      description: normalizedDescription
    }
  }
}