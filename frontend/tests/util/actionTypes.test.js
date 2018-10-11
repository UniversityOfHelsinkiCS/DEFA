import * as types from '../../src/util/actionTypes'

describe('action types', () => {
  it('are all unique.', () => {
    const prevTypes = {}
    Object.values(types).forEach(type => {
      expect(prevTypes[type]).toBeFalsy()
      prevTypes[type] = true
    })
  })
})
