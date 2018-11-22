import { gql } from 'apollo-boost'

// eslint-disable-next-line import/prefer-default-export
export const getCredits = gql`
  { 
    credits {
      grade
      student_number
      course_name
      course_code
      university
      date
      study_credits
      language
      teacher {
        email
        name
      }
    }
  }
`
export const getMyCredits = gql`
  { 
    me {
    credits {
      grade
      student_number
      course_name
      course_code
      university
      date
      study_credits
      language
      teacher {
        email
        name
      }
    }
  }
}
`
