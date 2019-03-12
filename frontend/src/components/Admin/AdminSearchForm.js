import React from 'react'
import { func } from 'prop-types'
import AdminSearchQuery from './AdminSearchQuery'
import UserSearchForm from '../UserSearch/UserSearchForm'
import { changeInput } from '../../util/actions/admin'
import withLocalize from '../../util/tieredLocalize'

const AdminSearchFormComponent = ({ translate }) => (
  <UserSearchForm
    submitButton={<AdminSearchQuery />}
    changeInput={changeInput}
    fields={{
      cn: translate('name'),
      studentNumber: translate('student_number'),
      username: translate('username')
    }}
  />
)

AdminSearchFormComponent.propTypes = {
  translate: func.isRequired
}

export default withLocalize('Admin.AdminSearchForm')(AdminSearchFormComponent)
