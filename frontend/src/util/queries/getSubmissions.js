import { gql } from 'apollo-boost'

export const getMySubmissions = gql`
  query getMySubmission($token: String!) { 
    authenticate(token: $token) {
      me {
        submissions {
          id
          url
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
      submissions(user: $user) {
        id
        url
        user {
          name
          username
          studentNumber
        }
      }
    }
  }
`
