const { gql } = require('apollo-server')

const schema = gql`
type User {
  id: ID!
  name: String!
  studentNumber: String!
  role: String!
  username: String!
  cn: String!
  email: String!
  submissions: [Submission]
}

input UserSearch {
  id: ID
  name: String
  studentNumber: String
  role: String
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
  setAdmin(username: String!): User
  setPriviledge(username: String!): User
  setStudent(username: String!): User
  
}

schema {
  query: Query
  mutation: Mutation
}
`

module.exports = schema
