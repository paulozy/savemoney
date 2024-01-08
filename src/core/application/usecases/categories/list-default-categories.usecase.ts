import { CategoryRepository } from "@core/domain/repositories/category-repository.interface";

export class ListDefaultCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute() {
    const categories = await this.categoryRepository.findDefaultCategories();

    return categories.map(category => category.toJSON());
  }
}