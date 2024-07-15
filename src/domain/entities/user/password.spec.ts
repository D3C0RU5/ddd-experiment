import { left } from '../../../shared/either'
import { InvalidPasswordError } from './errors/invalid-password'
import { Password } from './password'

describe('Password domain entity', () => {
  test('should not create password with empty value', async () => {
    const password = ''
    const passwordOrError = Password.create(password)
    expect(passwordOrError).toEqual(left(new InvalidPasswordError(password)))
  })

  test('should not create password with length less than 8', async () => {
    const password = 'aB1#'
    const user = Password.create(password)
    expect(user).toEqual(left(new InvalidPasswordError(password)))
  })

  test('should not create password without special characters', async () => {
    const password = 'InvalidPass123'
    const user = Password.create(password)
    expect(user).toEqual(left(new InvalidPasswordError(password)))
  })

  test('should not create password without uppercase characters', async () => {
    const password = 'invalid_pass123'
    const user = Password.create(password)
    expect(user).toEqual(left(new InvalidPasswordError(password)))
  })

  test('should not create password without lowercase characters', async () => {
    const password = 'INVALID_PASS123'
    const user = Password.create(password)
    expect(user).toEqual(left(new InvalidPasswordError(password)))
  })

  test('should not create password without numeric', async () => {
    const password = 'Invalid_Pass'
    const user = Password.create(password)
    expect(user).toEqual(left(new InvalidPasswordError(password)))
  })

  test('should not create password larger than 16 characters', async () => {
    const password = 'InvalidBigestPssword_123456789'
    const user = Password.create(password)
    expect(user).toEqual(left(new InvalidPasswordError(password)))
  })

  test('should create password whan is valid', async () => {
    const password = 'Valid_Pass_123'
    const user = Password.create(password)
    expect(user.isRight()).toBe(true)
  })
})
