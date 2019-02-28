import { gql } from 'apollo-boost'

// eslint-disable-next-line import/prefer-default-export
export const refreshToken = gql`
query refreshToken(
  $token: String!,
  $id: ID!
) {
  authenticate(
    token: $token
  ) {
    refreshToken(
      id: $id
    )
  }
}
`
