import { User } from '@src/domain/entities/user/user'

export interface AddUserRepository {
  add(userData: User): Promise<void>
}
