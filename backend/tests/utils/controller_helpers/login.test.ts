import { URL } from 'url'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {
  responseUrl,
  signToken,
  defaultRedirect,
  ISamlResponse,
  Irelay
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
const relay: Irelay = {
  login_url: String(process.env.ALLOWED_REDIRECTS.split(',')[0]),
  redirect_url: '/login/redirect'
}

describe('responseUrl function', () => {
  it('returns a valid url with query parameters \'token\' and \'redirect\'.', done => {
    let url
    try {
      url = new URL(responseUrl(defaultToken, relay))
    } catch (e) { done(e) }
    expect(url.search).toMatch(/(\?|\&)token=.+/)
    expect(url.search).toMatch(/(\?|\&)redirect=.+/)
    done()
  })

  it('includes a token that can be verified.', done => {
    const inputToken: string = jwt.sign(samlResponse.user, process.env.SECRET)
    let token: string
    try {
      const url = new URL(responseUrl(inputToken, relay))
      token = url.search.split('token=')[1].split('&')[0]
    } catch (e) { done(e) }
    expect(jwt.verify(token, process.env.SECRET)).toMatchObject(samlResponse.user)
    expect(() => jwt.verify(token, 'WRONGSECRETTHISSHALLNEVERWORK')).toThrowError('invalid signature')
    done()
  })

  it('uses the default redirect when no login url is provided by relay.', () => {
    const urlString = responseUrl(defaultToken, { ...relay, login_url: undefined })
    expect(urlString).toMatch(RegExp(`^${defaultRedirect}`))
  })
})

describe('signToken function', () => {
  const oldWarn = console.warn
  let warnings: string[] = []
  beforeAll(() => {
    console.warn = warning => warnings.push(warning)
  })
  beforeEach(() => {
    warnings = []
  })
  afterAll(() => {
    console.warn = oldWarn
  })

  it('prints a warning when samlResponse is of the wrong type.', async done => {
    let token: string | void
    try {
      token = await signToken({ ...samlResponse, type: 'wrong_type' })
    } catch (e) { done(e) }
    expect(token).toBeFalsy()
    expect(warnings.length).toBeGreaterThan(0)
    done()
  })

  it('prints a warning when samlResponse has no user.', async done => {
    let token: string | void
    try {
      token = await signToken({ ...samlResponse, user: undefined })
    } catch (e) { done(e) }
    expect(token).toBeFalsy()
    expect(warnings.length).toBeGreaterThan(0)
    done()
  })
})
