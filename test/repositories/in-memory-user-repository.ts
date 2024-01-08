import { User } from "@core/domain/entities/user.entity";
import { ExistsInput, UserRepository } from "@core/domain/repositories/user-repository.interface";

export class InMemoryUserRepository implements UserRepository {
  users: User[] = [];

  async exists({ email, id }: ExistsInput): Promise<boolean> {
    const user = this.users.find(user => user.email === email || user.id === id);

    return !!user;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === user.id);

    this.users[userIndex] = user;

    return user;
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);

    this.users.splice(userIndex, 1);
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }
}