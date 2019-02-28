const { gql } = require('apollo-server')

const schema = gql`
enum Role {
  STUDENT
  PRIVILEGED
  ADMIN
}

scalar Date

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

input UserEdit {
  name: String
  studentNumber: String
  username: String
  role: Role
  cn: String
  email: String
}

type Submission {
  id: ID!
  url: String!
  date: Date!
  user: User!
}

type Query {
  me: User
  users(user: UserSearch): [User]!
  submissions(user: UserSearch): [Submission]
  authenticate(token: String!): Query
  refreshToken(id: ID!): String
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
  editUser(id: ID!, values: UserEdit!): User
}

schema {
  query: Query
  mutation: Mutation
}
`

module.exports = schema