import { describe, expect, it } from 'vitest'
import { Person } from './person.entity'

describe('person entity', () => {
  it('should be possible create a new person', () => {
    const person = Person.create({
      name: 'test',
      avatar: 'any_avatar',
      userId: 'any_user_id',
    })

    expect(person).toBeDefined()
    expect(person.id).toBeDefined()
    expect(person.name).toBe('test')
    expect(person.avatar).toBe('any_avatar')
    expect(person.createdAt).toBeDefined()
    expect(person.updatedAt).toBeDefined()
  })

  it('should be possible update a person', () => {
    const person = Person.create({
      name: 'test',
      avatar: 'any_avatar',
      userId: 'any_user_id',
    })

    person.update({
      name: 'test2',
      avatar: 'any_avatar2',
    })

    expect(person.name).toBe('test2')
    expect(person.avatar).toBe('any_avatar2')
  })

  it('should be possible create a new person with id', () => {
    const person = Person.create({
      id: '123',
      name: 'test',
      userId: 'any_user_id',
      avatar: 'any_avatar',
    })

    expect(person).toBeDefined()
    expect(person.id).toBe('123')
    expect(person.name).toBe('test')
    expect(person.avatar).toBe('any_avatar')
    expect(person.createdAt).toBeDefined()
    expect(person.updatedAt).toBeDefined()
  })

  it('should be possible update a person', () => {
    const person = Person.create({
      name: 'test',
      userId: 'any_user_id',
      avatar: 'any_avatar',
    })

    person.update({
      name: 'test2',
      avatar: 'any_avatar2',
    })

    expect(person.name).toBe('test2')
    expect(person.avatar).toBe('any_avatar2')
  })

  it('should be possible create a new person with id', () => {
    const person = Person.create({
      id: '123',
      name: 'test',
      userId: 'any_user_id',
      avatar: 'any_avatar',
    })

    expect(person).toBeDefined()
    expect(person.id).toBe('123')
    expect(person.name).toBe('test')
    expect(person.avatar).toBe('any_avatar')
    expect(person.createdAt).toBeDefined()
    expect(person.updatedAt).toBeDefined()
  })

  it('should be possible convert a person to json', () => {
    const person = Person.create({
      name: 'test',
      userId: 'any_user_id',
      avatar: 'any_avatar',
    })

    const json = person.toJSON()

    expect(json).toBeDefined()
    expect(json.id).toBe(person.id)
    expect(json.name).toBe('test')
    expect(json.avatar).toBe('any_avatar')
    expect(json.createdAt).toStrictEqual(new Date(person.createdAt))
    expect(json.updatedAt).toStrictEqual(new Date(person.updatedAt))
  })
})
