import { AddUserRepository } from '@src/data/protocols/db/user/add-user-repository'
import { UserData } from '@src/domain/entities/user/interface/user-data'
import { User, UserCreateErrors } from '@src/domain/entities/user/user'
import { AddUser } from '@src/domain/usecases/add-user'
import { Either, left, right } from '@src/shared/either'

export class DbAddUser implements AddUser {
  constructor(private readonly addUserRepository: AddUserRepository) {}

  async add(userData: UserData): Promise<Either<UserCreateErrors, boolean>> {
    const userOrError = User.create(userData)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const user = userOrError.value
    await this.addUserRepository.add(user)
    return right(true)
  }
}
