import { gql } from 'apollo-boost'

export const getMySubmission = gql`
  { 
    me {
      submissions {
        url
      }
      identifiers {
        university
        student_number
      }
    }
  }
`
export const getSubmissions = gql`
  { 
    submissions {
      user {
        name
        identifiers {
          student_number
          university
        }
      }
      url
    }
  }
`
