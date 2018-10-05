import { URL } from 'url'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { responseUrl, defaultRedirect } from '../../../src/utils/controller_helpers/login'

dotenv.config()

const samlResponse = {
  type: 'authn_response',
  user: {
    isUser: 'totally'
  }
}
const relay = {
  redirect_url: String(process.env.ALLOWED_REDIRECTS.split(',')[0])
}

describe('responseUrl function', () => {
  it('returns a valid url with query parameter \'token.\'', done => {
    let url
    try {
      url = new URL(responseUrl(samlResponse, relay))
    } catch (e) { done(e) }
    expect(url.search).toMatch(/^\?token=.+/)
    done()
  })

  describe('it does not include a token and warns when', () => {
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

    it('samlResponse is of the wrong type.', done => {
      let url
      try {
        url = new URL(responseUrl({ ...samlResponse, type: 'wrong_type' }, relay))
      } catch (e) { done(e) }
      expect(url.search).not.toMatch('token=')
      expect(warnings.length).toBeGreaterThan(0)
      done()
    })

    it('samlResponse has no user.', done => {
      let url
      try {
        url = new URL(responseUrl({ ...samlResponse, user: undefined }, relay))
      } catch (e) { done(e) }
      expect(url.search).not.toMatch('token=')
      expect(warnings.length).toBeGreaterThan(0)
      done()
    })
  })

  it('includes a token that can be verified.', done => {
    let token: string
    try {
      const url = new URL(responseUrl(samlResponse, relay))
      token = url.search.split('=')[1]
    } catch (e) { done(e) }
    expect(jwt.verify(token, process.env.SECRET)).toMatchObject(samlResponse.user)
    expect(() => jwt.verify(token, 'WRONGSECRETTHISSHALLNEVERWORK')).toThrowError('invalid signature')
    done()
  })

  it('uses the default redirect when no redirect url is provided by relay.', () => {
    const urlString = responseUrl(samlResponse, { ...relay, redirect_url: undefined })
    expect(urlString).toMatch(RegExp(`^${defaultRedirect}`))
  })
})
