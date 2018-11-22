import { gql } from 'apollo-boost'

// eslint-disable-next-line import/prefer-default-export
export const getMyIdentifiers = gql`
  { 
    me {
      identifiers {
        university
        student_number
      }
    }
  }
`
