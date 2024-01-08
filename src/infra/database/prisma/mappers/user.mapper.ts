import { User } from '@core/domain/entities/user.entity';
import { User as RawUser } from '@prisma/client';

export class UserMapper {
  static toDomain(userData: RawUser): User {
    const user = User.create({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      createdAt: new Date(userData.createdAt).getTime(),
      updatedAt: new Date(userData.updatedAt).getTime(),
    });

    return user;
  }

  static toPersistence(user: User): RawUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    };
  }
}