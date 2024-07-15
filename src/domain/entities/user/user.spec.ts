import { UserData } from './interface/user-data'
import { InvalidNameError } from './errors/invalid-name'
import { InvalidEmailError } from './errors/invalid-email'
import { User } from './user'

describe('User Entity', () => {
  const validUserData: UserData = {
    name: 'Valid Name',
    email: 'valid@example.com',
    password: 'Valid_Pass_123',
  }

  it('should create a User when provided valid data', () => {
    const userOrError = User.create(validUserData)
    expect(userOrError.isRight()).toBe(true)
    if (userOrError.isRight()) {
      const user = userOrError.value
      expect(user).toBeInstanceOf(User)
      expect(user).toHaveProperty('name')
      expect(user).toHaveProperty('email')
      expect(user).toHaveProperty('password')
    }
  })

  it('should return an InvalidNameError when provided an invalid name', () => {
    const invalidUserData: UserData = { ...validUserData, name: '' }
    const userOrError = User.create(invalidUserData)
    expect(userOrError.isLeft()).toBe(true)
    if (userOrError.isLeft()) {
      expect(userOrError.value).toBeInstanceOf(InvalidNameError)
    }
  })

  it('should return an InvalidEmailError when provided an invalid email', () => {
    const invalidUserData: UserData = {
      ...validUserData,
      email: 'invalid-email',
    }
    const userOrError = User.create(invalidUserData)
    expect(userOrError.isLeft()).toBe(true)
    if (userOrError.isLeft()) {
      expect(userOrError.value).toBeInstanceOf(InvalidEmailError)
    }
  })

  it('should return an error when provided an invalid password', () => {
    const invalidUserData: UserData = { ...validUserData, password: '123' }
    const userOrError = User.create(invalidUserData)
    expect(userOrError.isLeft()).toBe(true)
  })
})
