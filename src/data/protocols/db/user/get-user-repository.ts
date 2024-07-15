import { User } from '@src/domain/entities/user/user'

export interface GetUserRepository {
  getUser(userId: number): Promise<User>
}
