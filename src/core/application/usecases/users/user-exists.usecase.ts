import { UserRepository } from "@core/domain/repositories/user-repository.interface"

export type UserExistsUseCaseInput = {
  email: string
}

export class UserExistsUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute({ email }: UserExistsUseCaseInput) {
    const userExists = await this.userRepository.exists({
      email
    })

    return userExists
  }
}