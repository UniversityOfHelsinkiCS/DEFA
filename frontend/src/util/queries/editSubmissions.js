import { gql } from 'apollo-boost'

// eslint-disable-next-line import/prefer-default-export
export const approveSubmission = gql`
mutation approveSubmission(
  $token: String!,
  $submission: ID!,
  $approval: Approval!
) {
  authenticate(
    token: $token
  ) {
    approveSubmission(
      submission: $submission,
      approval: $approval
    ) {
      id
      approval
    }
  }
}
`
