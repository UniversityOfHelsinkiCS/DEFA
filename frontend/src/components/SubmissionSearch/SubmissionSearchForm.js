import React from 'react'
import SubmissionSearchQuery from './SubmissionSearchQuery'
import UserSearchForm from '../UserSearch/UserSearchForm'
import { changeInput } from '../../util/actions/submissionSearch'

export const SubmissionSearchFormComponent = () => (
  <UserSearchForm
    submitButton={<SubmissionSearchQuery />}
    changeInput={changeInput}
    fields={{
      cn: 'Name',
      studentNumber: 'Student Number',
      username: 'Username'
    }}
  />
)

export default SubmissionSearchFormComponent
