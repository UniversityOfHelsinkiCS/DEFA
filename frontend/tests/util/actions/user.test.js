import jwt from 'jsonwebtoken'
import * as actions from '../../../src/util/actions/user'
import { testAction } from '../../testUtils'
import * as types from '../../../src/util/actionTypes'

const testToken = jwt.sign({ user_object: true }, 'TESTSTRINGOFCHARACTERSMIMICINGASECRET')

testAction(actions.parseUser, {
  input: testToken,
  expectation: {
    type: types.USER_PARSE_USER,
    token: testToken
  }
})

describe('logout action', () => {
  let tokenBefore
  const dispatch = jest.fn()
  beforeAll(() => {
    tokenBefore = window.localStorage.getItem('DEFA-token')
  })
  beforeEach(() => {
    window.localStorage.setItem('DEFA-token', testToken)
    dispatch.mockClear()
  })
  afterAll(() => {
    window.localStorage.setItem('DEFA-token', tokenBefore)
  })

  it('dispatches correct action type when called.', () => {
    actions.logout({})(dispatch)
    expect(dispatch).toHaveBeenCalledWith({
      type: types.USER_LOG_OUT,
      toast: undefined
    })
  })
  it('adds a toast field to action when displayToast is set as true.', () => {
    actions.logout({ displayToast: true })(dispatch)
    expect(dispatch).toHaveBeenCalledWith({
      type: types.USER_LOG_OUT,
      toast: expect.objectContaining({
        message: expect.any(String)
      })
    })
  })
  it('removes DEFA-token item from localStorage.', () => {
    expect(localStorage.getItem('DEFA-token')).toEqual(testToken)
    actions.logout({})(dispatch)
    expect(localStorage.getItem('DEFA-token')).toBe(null)
  })
})
