import { gql } from 'apollo-boost'

export const getSubmissionKoski = gql`
  query getSubmission(
    $token: String!,
    $id: ID!
  ) {
    authenticate(token: $token) {
      submission(id: $id) {
        koski {
          name
          courses {
            name
            credits
          }
        }
      }
    }
  }
`

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
