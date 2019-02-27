import { gql } from 'apollo-boost'

export const getMySubmissions = gql`
  query getMySubmission($token: String!) { 
    authenticate(token: $token) {
      me {
        submissions {
          id
          url
          date
          approval
        }
      }
    }
  }
`
export const getSubmissions = gql`
  query getSubmissions(
    $token: String!,
    $user: UserSearch
  ) { 
    authenticate(token: $token) {
      users(user: $user) {
        id
        name
        username
        studentNumber
        submissions {
          id
          url
          date
          approval
        }
      }
    }
  }
`
