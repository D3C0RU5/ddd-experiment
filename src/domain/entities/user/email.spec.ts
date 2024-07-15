import { Email } from './email'

describe('Email validator', () => {
  test('Should accept valid email', () => {
    expect(Email.validate('localpart@mail.com')).toBe(true)
  })

  test('Should not accept email without the at-sign', () => {
    expect(Email.validate('localpartmail.com')).toBe(false)
  })

  test('Should not accept more than 64 chars on local part', () => {
    const localPart = 'c'.repeat(100)
    const email = localPart + '@mail.com'
    expect(Email.validate(email)).toBe(false)
  })

  test('Should not accept empty local part', () => {
    expect(Email.validate('@mail.com')).toBe(false)
  })

  test('Should not accept invalid char - local part', () => {
    expect(Email.validate('local part@mail.com')).toBe(false)
  })

  test('Should not accept a dot as first char - local part', () => {
    expect(Email.validate('.localpart@mail.com')).toBe(false)
  })

  test('Should not accept a dot as last char - local part', () => {
    expect(Email.validate('localpart.@mail.com')).toBe(false)
  })

  test('Should not accept more than 255 chars on domain part', () => {
    const domain = 'c'.repeat(260)
    const email = 'localpart@' + domain + '.com'
    expect(Email.validate(email)).toBe(false)
  })

  test('Should not accept dot as first char - domain part', () => {
    expect(Email.validate('localpart@.mail.com')).toBe(false)
  })
})
