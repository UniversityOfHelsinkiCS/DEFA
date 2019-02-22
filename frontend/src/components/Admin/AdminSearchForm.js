import React from 'react'
import AdminSearchQuery from './AdminSearchQuery'
import UserSearchForm from '../UserSearch/UserSearchForm'
import { changeInput } from '../../util/actions/admin'

const AdminSearchFormComponent = () => (
  <UserSearchForm
    submitButton={<AdminSearchQuery />}
    changeInput={changeInput}
    fields={{
      cn: 'Name',
      studentNumber: 'Student Number',
      username: 'Username'
    }}
  />
)

export default AdminSearchFormComponent
