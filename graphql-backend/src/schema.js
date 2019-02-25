const { gql } = require('apollo-server')

const schema = gql`
enum Role {
  STUDENT
  PRIVILEGED
  ADMIN
}

scalar Date

enum Approval {
  PENDING
  APPROVED
  REJECTED
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
  approval: Approval!
  user: User!
}

type Query {
  authenticate(token: String!): Query
  me: User
  users(user: UserSearch): [User]!
  submissions(user: UserSearch): [Submission]
}

type Mutation {
  authenticate(token: String!): Mutation
  login(
    name: String!,
    studentNumber: String,
    role: String,
    username: String!,
    cn: String!,
    email: String!
  ): String
  createSubmission(url: String!): Submission
  editUser(id: ID!, values: UserEdit!): User
  approveSubmission(
    submission: ID!
    approval: Approval!
  ): Submission
}

schema {
  query: Query
  mutation: Mutation
}
`

module.exports = schema
