import { gql } from 'apollo-boost'

// eslint-disable-next-line import/prefer-default-export
export const createSubmission = gql`
mutation createSubmission(
  $token: String!
  $url: String!
  $comment: String
) { 
  authenticate(
    token: $token
  ) {
    createSubmission(
      url: $url,
      comment: $comment
    ) {
      id
      url
      date
      approval
      comment
    }
  }
}
`
