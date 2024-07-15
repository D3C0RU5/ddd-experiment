import { Either, left, right } from '@src/shared/either'
import { InvalidPasswordError } from './errors/invalid-password'

export class Password {
  private constructor(private readonly password: string) {
    Object.freeze(this)
  }

  static create(password: string): Either<InvalidPasswordError, Password> {
    if (!Password.validate(password)) {
      return left(new InvalidPasswordError(password))
    }
    return right(new Password(password))
  }

  get value(): string {
    return this.password
  }

  static validate(password: string): boolean {
    const pattern = new RegExp(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.* ).{8,16}$/,
    )

    if (!password || !pattern.test(password)) {
      return false
    }
    return true
  }
}
