import { Category } from "@core/domain/entities/category.entity";
import { CategoryRepository, ExistsInput, FindByUserIdInput } from "@core/domain/repositories/category-repository.interface";
import { defaultCategories } from "../../src/utils/default-categories";

export class InMemoryCategoryRepository implements CategoryRepository {
  categories: Category[] = [];

  constructor() {
    defaultCategories.forEach(category => {
      this.categories.push(Category.create(category));
    })
  }

  async exists({ id, name }: ExistsInput): Promise<boolean> {
    if (id) {
      const category = this.categories.find(category => category.id === id);

      return !!category;
    }

    if (name) {
      const category = this.categories.find(category => category.name === name);

      return !!category;
    }

    return false;
  }

  async create(category: Category): Promise<Category> {
    this.categories.push(category);

    return category;
  }

  async save(category: Category): Promise<Category> {
    const index = this.categories.findIndex(item => item.id === category.id);

    this.categories[index] = category;

    return category
  }

  async delete(id: string): Promise<void> {
    const index = this.categories.findIndex(item => item.id === id);

    this.categories.splice(index, 1);
  }

  async findById(id: string): Promise<Category> {
    const category = this.categories.find(category => category.id === id);

    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name);

    return category;
  }

  async findByUserId({
    userId,
    name,
    description,
    page,
    limit,
    sort
  }: FindByUserIdInput): Promise<Category[]> {
    let categories = this.categories.filter(category => category.userId === userId);

    if (name) {
      categories = categories.filter(category => category.name === name);
    }

    if (description) {
      categories = categories.filter(category => category.description === description);
    }

    if (sort) {
      categories = categories.sort((a, b) => {
        if (sort === 'asc') {
          return a.createdAt - b.createdAt;
        }

        return b.createdAt - a.createdAt;
      });
    }

    const start = (page - 1) * limit;
    const end = page * limit;

    const paginatedCategories = categories.slice(start, end);

    return paginatedCategories;
  }

  async findDefaultCategories(): Promise<Category[]> {
    const categories = this.categories.filter(category => category.userId === undefined);

    return categories;
  }
}