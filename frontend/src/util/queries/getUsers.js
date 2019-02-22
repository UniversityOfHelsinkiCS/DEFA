import { gql } from 'apollo-boost'

// eslint-disable-next-line import/prefer-default-export
export const getUsers = gql`
query getUsers(
  $token: String!,
  $user: UserSearch!
) {
  authenticate(
    token: $token
  ) {
    users(
      user: $user
    ) {
      id
      username
      name
      cn
      studentNumber
      role
      email
    }
  }
}
`
