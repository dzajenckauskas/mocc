import { describe, it, expect } from 'vitest'
import { toSlug } from './slugify'

describe('toSlug', () => {
  it('returns empty string for nullish values', () => {
    expect(toSlug(null)).toBe('')
    expect(toSlug(undefined)).toBe('')
  })

  it('lowercases and replaces non-alphanumerics with dashes', () => {
    expect(toSlug('Hello World!')).toBe('hello-world')
    expect(toSlug('React + TypeScript = <3')).toBe('react-typescript-3')
  })

  it('removes leading and trailing dashes', () => {
    expect(toSlug('  -- Hello --  ')).toBe('hello')
  })

  it('strips diacritics (Lithuanian letters)', () => {
    // Lithuanian characters like ą č ę ė į š ų ū ž
    expect(toSlug('ĄČĘĖĮŠŲŪŽ testas')).toBe('aceeisuuz-testas')
    expect(toSlug('žąsis į ūpę')).toBe('zasis-i-upe')
  })
})

