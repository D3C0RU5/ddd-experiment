import { GetUserRepository } from '@src/data/protocols/db/user/get-user-repository'
import { UpdateUserRepository } from '@src/data/protocols/db/user/update-user-repository'
import { UserData } from '@src/domain/entities/user/interface/user-data'
import { UserCreateErrors } from '@src/domain/entities/user/user'
import { UpdateUser } from '@src/domain/usecases/update-user'
import { Either, left, right } from '@src/shared/either'

export class DbUpdateUser implements UpdateUser {
  constructor(
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly getUserRepository: GetUserRepository,
  ) {}

  async update(
    userId: number,
    partialUser: Partial<UserData>,
  ): Promise<Either<UserCreateErrors, boolean>> {
    const userDb = await this.getUserRepository.getUser(userId)
    const userOrError = userDb.update(partialUser)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const user = userOrError.value

    await this.updateUserRepository.update(user)
    return right(true)
  }
}
