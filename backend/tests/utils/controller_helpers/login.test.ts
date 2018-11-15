import { URL } from 'url'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {
  responseUrl,
  ISamlResponse
} from '../../../src/utils/controller_helpers/login'
import { IUser } from '../../../src/schema/types/interface'

dotenv.config()

const samlResponse: ISamlResponse = {
  type: 'authn_response',
  user: {
    isUser: 'totally'
  } as unknown as IUser
} as unknown as ISamlResponse
const defaultToken: string = 'testtoken'

describe('responseUrl function', () => {
  it('returns a valid url with query parameter \'token\'.', done => {
    let url
    try {
      url = new URL(responseUrl(defaultToken))
    } catch (e) { done(e) }
    expect(url.search).toMatch(/(\?|\&)token=.+/)
    done()
  })

  it('includes a token that can be verified.', done => {
    const inputToken: string = jwt.sign(samlResponse.user, process.env.SECRET)
    let token: string
    try {
      const url = new URL(responseUrl(inputToken))
      token = url.search.split('token=')[1].split('&')[0]
    } catch (e) { done(e) }
    expect(jwt.verify(token, process.env.SECRET)).toMatchObject(samlResponse.user)
    expect(() => jwt.verify(token, 'WRONGSECRETTHISSHALLNEVERWORK')).toThrowError('invalid signature')
    done()
  })
})
