import { gql } from 'apollo-boost'

export const getMe = gql`
query getMySubmission($token: String!) { 
  authenticate(token: $token) {
    me {
      email
      submissions {
        id
        url
        date
        comment
      }
    }
  }
}
`

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
