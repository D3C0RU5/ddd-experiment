import { Either } from '@src/shared/either'
import { UserCreateErrors } from '../entities/user/user'
import { UserData } from '../entities/user/interface/user-data'

export interface UpdateUser {
  update: (
    userId: number,
    partialUser: UserData,
  ) => Promise<Either<UserCreateErrors, boolean>>
}
