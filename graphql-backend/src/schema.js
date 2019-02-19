const { gql } = require('apollo-server')

const schema = gql`
enum Role {
  STUDENT
  PRIVILEGED
  ADMIN
}

type User {
  id: ID!
  name: String!
  studentNumber: String!
  role: Role!
  username: String!
  cn: String!
  email: String!
  submissions: [Submission]
}

input UserSearch {
  id: ID
  name: String
  studentNumber: String
  role: Role
  username: String
  cn: String
  email: String
}

type Submission {
  id: ID!
  url: String!
  user: User
}

type Query {
  me: User
  submissions(user: UserSearch): [Submission]
  authenticate(token: String!): Query
}

type Mutation {
  login(
    name: String!,
    studentNumber: String,
    role: String,
    username: String!,
    cn: String!,
    email: String!
  ): String
  createSubmission(url: String!): Submission
  authenticate(token: String!): Mutation
  setRole(username: String!, role: Role!): User
}

schema {
  query: Query
  mutation: Mutation
}
`

module.exports = schema
