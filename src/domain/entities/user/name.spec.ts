import { Name } from './name'

describe('Name validator', () => {
  test('Should accept valid name', () => {
    expect(Name.validate('valid name')).toBe(true)
  })

  test('Should not accept with empty', () => {
    expect(Name.validate('')).toBe(false)
  })

  test('Should not accept when size is less than 2', () => {
    expect(Name.validate('c')).toBe(false)
  })

  test('Should not accept when size is greater than 255', () => {
    expect(Name.validate('c'.repeat(256))).toBe(false)
  })
})
