import { User } from '@src/domain/entities/user/user'

export interface UpdateUserRepository {
  update(userData: User): Promise<void>
}
