import { Category } from "../entities/category.entity";

export type FindByUserIdInput = {
  userId: string;
  name?: string;
  description?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export type ExistsInput = {
  name?: string;
  id?: string;
}

export interface CategoryRepository {
  exists(input: ExistsInput): Promise<boolean>;
  create(category: Category): Promise<Category>;
  save(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  findByUserId(userId: FindByUserIdInput): Promise<Category[]>;
  findDefaultCategories(): Promise<Category[]>;
}