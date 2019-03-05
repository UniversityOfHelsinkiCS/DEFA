import React from 'react'
import UserSearchForm from '../UserSearch/UserSearchForm'
import { changeInput } from '../../util/actions/submissionSearch'

export const SubmissionSearchFormComponent = () => (
  <UserSearchForm
    changeInput={changeInput}
    fields={{
      cn: 'Name',
      studentNumber: 'Student Number',
      username: 'Username'
    }}
  />
)

export default SubmissionSearchFormComponent
