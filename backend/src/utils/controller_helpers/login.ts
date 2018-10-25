import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import axios, { AxiosResponse } from 'axios'

dotenv.config()

export interface ISamlResponse {
  type: string,
  user: object
}

export interface Iattributes {
  [key: string]: string
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
const signToken = (attributes: Iattributes): string | void => {
  // if (samlResponse.type !== 'authn_response') {
  //   console.warn(`Expected saml response to be of type 'authn_response', but was '${samlResponse.type}'`)
  //   return null
  // }
  const user = parseUser(attributes)
  // if (!samlResponse.user) {
  //   console.warn('Could not find required field \'user\' in saml response.')
  //   return null
  // }
  return jwt.sign(user, process.env.SECRET)
}
export const responseUrl = (attributes: Iattributes, relay: Irelay): string => {
  const token: string | void = signToken(attributes)
  const redirectUrl: string = validateRedirect(relay.redirect_url) ? (
    relay.redirect_url
  ) : (
      defaultRedirect
    )
  return applyToken(redirectUrl, token)
}

export const getMetadata = async (entityId: string): Promise<string> => {
  const response = await axios.get(entityId)
  return response.data
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

const parseUser = (attributes: { [index: string]: string }): object => {
  const user: { [index: string]: string } = {}
  Object.keys(samlResponseAttributes).forEach(attribute => (
    user[attribute] = attributes[samlResponseAttributes[attribute]]
  ))
  return user
}

export const samlResponseAttributes: { [index: string]: string } = {
  cn: 'urn:oid:2.5.4.3',
  displayName: 'urn:oid:2.16.840.1.113730.3.1.241',
  eduPersonPrincipalName: 'urn:oid:1.3.6.1.4.1.5923.1.1.1.6',
  mail: 'urn:oid:0.9.2342.19200300.100.1.3',
  schacHomeOrganization: 'urn:oid:1.3.6.1.4.1.25178.1.2.9',
  schacPersonalUniqueCode: 'urn:oid:1.3.6.1.4.1.25178.1.2.14'
}
