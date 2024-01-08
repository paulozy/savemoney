import { CategoryRepository } from "@core/domain/repositories/category-repository.interface";

export type DeleteCategoryInput = {
  id: string;
};

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(input: DeleteCategoryInput) {
    this.validateInput(input);

    const { id } = input;

    const category = await this.categoryRepository.exists({ id });

    if (!category) {
      throw new Error('Category not found');
    }

    await this.categoryRepository.delete(id);
  }

  private validateInput(input: DeleteCategoryInput) {
    const { id } = input;

    if (!id) {
      throw new Error('Category id is required');
    }

    if (typeof id !== 'string') {
      throw new Error('Category id must be a string');
    }
  }
}