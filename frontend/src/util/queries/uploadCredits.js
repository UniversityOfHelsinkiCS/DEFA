import { gql } from 'apollo-boost'

// eslint-disable-next-line import/prefer-default-export
export const createCredits = gql`
  mutation createCredits($credits: [Credit]!) {
    createCredits(credits: $credits) {
      id
    }
  }
`
