import { User } from "../entities/user.entity";

export type ExistsInput = {
  email?: string;
  id?: string;
}

export interface UserRepository {
  exists(input: ExistsInput): Promise<boolean>;
  create(user: User): Promise<User>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}