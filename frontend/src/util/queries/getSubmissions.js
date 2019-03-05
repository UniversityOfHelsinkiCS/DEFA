import { gql } from 'apollo-boost'

// eslint-disable-next-line import/prefer-default-export
export const getSubmissions = gql`
  query getSubmissions(
    $token: String!
  ) { 
    authenticate(token: $token) {
      users(user: {}) {
        id
        name
        cn
        username
        studentNumber
        submissions {
          id
          url
          date
          approval
          comment
        }
      }
    }
  }
`
