import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export interface ISamlResponse {
  type: string,
  user: object
}
export interface Irelay {
  redirect_url?: string
}
// Possible redirects must be limited so as not to allow reflected XSS attacks.
const allowedRedirects: RegExp[] = process.env.ALLOWED_REDIRECTS.split(',').map(
  (str: string): RegExp => str[0] === '^' ? RegExp(str) : RegExp(`^${str}`)
)
export const defaultRedirect: string = '/todo-404-page'
const validateRedirect = (url: string | void): boolean => url ? allowedRedirects.reduce(
  (acc: boolean, regex: RegExp) => acc || Boolean(url.match(regex)),
  false
) : false

const applyToken = (url: string, token: string | void): string => token ? (
    `${url}?token=${token}`
  ) : (
    `${url}?error=Kirjautuminen epäonnistui. Kirjautumispalvelu antoi epämuodostuneita tietoja.`
  )
const signToken = (samlResponse: ISamlResponse): string | void => {
  if (samlResponse.type !== 'authn_response') {
    console.warn(`Expected saml response to be of type 'authn_response', but was '${samlResponse.type}'`)
    return null
  }
  if (!samlResponse.user) {
    console.warn('Could not find required field \'user\' in saml response.')
    return null
  }
  return jwt.sign(samlResponse.user, process.env.SECRET)
}
export const responseUrl = (samlResponse: ISamlResponse, relay: Irelay): string => {
  const token: string | void = signToken(samlResponse)
  const redirectUrl: string = validateRedirect(relay.redirect_url) ? (
    relay.redirect_url
  ) : (
    defaultRedirect
  )
  return applyToken(redirectUrl, token)
}

const defaultErrorMessage: string = 'Yllättävä virhe tapahtui.'
const applyError = (redirectUrl: string, errorMessage: string): string => `${redirectUrl}?error=${errorMessage}`
export const errorUrl = (error: { message: string }, relay: Irelay): string => {
  const errorMessage = `Kirjautuminen epäonnistui. Kirjautumispalvelun virheilmoitus: ${error.message}`
  const redirectUrl: string = validateRedirect(relay.redirect_url) ? (
    relay.redirect_url
  ) : (
    defaultRedirect
  )
  return applyError(redirectUrl, errorMessage)
}
