const { gql } = require('apollo-server')

const schema = gql`
enum Role {
  STUDENT
  PRIVILEGED
  ADMIN
}

scalar Date

scalar KoskiURL

enum Approval {
  PENDING
  APPROVED
  REJECTED
}

type KoskiUniversity {
  name: String!
  courses: [KoskiCourse!]!
}

type KoskiCourse {
  name: String!
  credits: Float!
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
  url: KoskiURL!
  date: Date!
  approval: Approval!
  comment: String!
  user: User!
  koski: [KoskiUniversity!]
}

type DEFACourse {
  id: ID!
  name: MultilingualName!
  required: Boolean!
}

type MultilingualName {
  en: String!
  fi: String!
  sv: String!
}

input MultilingualNameInput {
  en: String!
  fi: String!
  sv: String!
}

type Query {
  authenticate(token: String!): Query
  me: User
  users(user: UserSearch): [User]!
  submission(id: ID!): Submission
  submissions(user: UserSearch): [Submission]
  refreshToken(id: ID!): String
  DEFACourses: [DEFACourse!]!
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
  deleteSubmission(id: ID!): String
  createSubmission(url: KoskiURL!, comment: String): Submission
  editUser(id: ID!, values: UserEdit!): User
  approveSubmission(
    submission: ID!
    approval: Approval!
  ): Submission
  createDEFACourse(
    name: MultilingualNameInput!,
    required: Boolean
  ): DEFACourse!
  deleteDEFACourse(id: ID!): DEFACourse
  updateDEFACourse(
    id: ID!,
    name: MultilingualNameInput,
    required: Boolean
  ): DEFACourse!
}

schema {
  query: Query
  mutation: Mutation
}
`

module.exports = schema
