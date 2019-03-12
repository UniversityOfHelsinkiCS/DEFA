import React from 'react'
import { func } from 'prop-types'
import UserSearchForm from '../UserSearch/UserSearchForm'
import { changeInput } from '../../util/actions/submissionSearch'
import withLocalize from '../../util/tieredLocalize'

export const SubmissionSearchFormComponent = ({ translate }) => (
  <UserSearchForm
    changeInput={changeInput}
    fields={{
      cn: translate('name'),
      studentNumber: translate('student_number'),
      username: translate('username')
    }}
  />
)

SubmissionSearchFormComponent.propTypes = {
  translate: func.isRequired
}

export default withLocalize('SubmissionSearch.SubmissionSearchForm')(SubmissionSearchFormComponent)
