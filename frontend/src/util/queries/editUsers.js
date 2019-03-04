import { gql } from 'apollo-boost'

// eslint-disable-next-line import/prefer-default-export
export const editUser = gql`
mutation editUser(
  $token: String!,
  $id: ID!,
  $values: UserEdit!
) {
  authenticate(
    token: $token
  ) {
    editUser(
      id: $id,
      values: $values
    ) {
      id
      username
      name
      cn
      studentNumber
      role
      email
    }
  }
}
`
