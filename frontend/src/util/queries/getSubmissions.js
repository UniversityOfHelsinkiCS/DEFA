import { gql } from 'apollo-boost'

export const getMySubmission = gql`
  query getMySubmission($token: String!) { 
    authenticate(token: $token) {
      me {
        submissions {
          url
        }
      }
    }
  }
`
export const getSubmissions = gql`
  query getSubmissions($token: String!) { 
    authenticate(token: $token) {
    { 
      submissions {
        url
        user {
          name
          studentNumber
        }
    }
  }
`
