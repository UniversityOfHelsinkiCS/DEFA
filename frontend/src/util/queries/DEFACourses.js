import { gql } from 'apollo-boost'

export const CREATE_DEFA_COURSE = gql`
mutation createDEFACourse(
  $token: String!,
  $name: MultilingualNameInput!
) {
  authenticate(
    token: $token
  ) {
    createDEFACourse(
      name: $name
    ) {
      id
      name {
        en
        fi
        sv
      }
      required
    }
  }
}
`

export const GET_ALL_DEFA_COURSES = gql`
query getAllDEFACourses(
  $token: String!
) {
  authenticate(
    token: $token
  ) {
    DEFACourses {
      id
      name {
        en
        fi
        sv
      }
      required
    }
  }
}
`

export const UPDATE_DEFA_COURSE = gql`
mutation updateDEFACourse(
  $token: String!,
  $id: ID!,
  $name: MultilingualNameInput,
  $required: Boolean
) {
  authenticate(
    token: $token
  ) {
    updateDEFACourse(
      id: $id,
      name: $name,
      required: $required
    ) {
      id
      name {
        en
        fi
        sv
      }
      required
    }
  }
}
`

export const DELETE_DEFA_COURSE = gql`
mutation deleteDEFACourse(
  $token: String!,
  $id: ID!
) {
  authenticate(
    token: $token
  ) {
    deleteDEFACourse(
      id: $id
    ) {
      id
    }
  }
}
`
