import { Either } from '@src/shared/either'
import { UserData } from '../entities/user/interface/user-data'
import { UserCreateErrors } from '../entities/user/user'

export interface AddUser {
  add: (userData: UserData) => Promise<Either<UserCreateErrors, boolean>>
}
