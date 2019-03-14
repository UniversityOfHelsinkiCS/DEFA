import { gql } from 'apollo-boost'

// eslint-disable-next-line import/prefer-default-export
export const deleteSubmission = gql`
  mutation deleteSubmission(
    $token: String!
    $id: ID!
  ) { 
    authenticate(
      token: $token
    ) {
      deleteSubmission(
        id: $id
      )
    }
  }
`
