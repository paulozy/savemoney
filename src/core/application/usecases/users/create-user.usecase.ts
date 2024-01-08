import { User } from "@core/domain/entities/user.entity";
import { UserRepository } from "@core/domain/repositories/user-repository.interface";

export type CreateUserInput = {
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async execute(input: CreateUserInput): Promise<User> {
    this.validateInput(input);

    const { email } = input;

    const userAlreadyExists = await this.userRepository.exists({ email });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = User.create(input);

    return await this.userRepository.create(user);
  }

  private validateInput(input: CreateUserInput) {
    const { email } = input;

    const re = /\S+@\S+\.\S+/;

    const isValidEmail = re.test(email);

    if (!isValidEmail) {
      throw new Error('Invalid email');
    }
  }
}