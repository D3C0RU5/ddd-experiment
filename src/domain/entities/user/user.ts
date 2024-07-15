import { Either, left, right } from '@src/shared/either'
import { Email } from './email'
import { Name } from './name'
import { UserData } from './interface/user-data'
import { InvalidNameError } from './errors/invalid-name'
import { InvalidEmailError } from './errors/invalid-email'
import { Password } from './password'
import { InvalidPasswordError } from './errors/invalid-password'

export type UserCreateErrors =
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordError

export class User {
  private constructor(
    protected name: Name,
    protected email: Email,
    protected password: Password,
  ) {
    Object.freeze(this)
  }

  static create(user: UserData): Either<UserCreateErrors, User> {
    const nameOrError = Name.create(user.name)
    if (nameOrError.isLeft()) return left(nameOrError.value)

    const emailOrError = Email.create(user.email)
    if (emailOrError.isLeft()) return left(emailOrError.value)

    const passwordOrError = Password.create(user.password)
    if (passwordOrError.isLeft()) return left(passwordOrError.value)

    const name: Name = nameOrError.value
    const email: Email = emailOrError.value
    const password: Password = passwordOrError.value

    return right(new User(name, email, password))
  }

  update(user: Partial<UserData>): Either<UserCreateErrors, User> {
    if (user.name) {
      const nameOrError = Name.create(user.name)
      if (nameOrError.isLeft()) return left(nameOrError.value)
      this.name = nameOrError.value
    }

    if (user.email) {
      const emailOrError = Email.create(user.email)
      if (emailOrError.isLeft()) return left(emailOrError.value)
      this.email = emailOrError.value
    }

    if (user.password) {
      const passwordOrError = Password.create(user.password)
      if (passwordOrError.isLeft()) return left(passwordOrError.value)
      this.password = passwordOrError.value
    }
    return right(this)
  }
}
