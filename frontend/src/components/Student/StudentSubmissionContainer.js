import React from 'react'
import { func } from 'prop-types'
import CardContainer from './CardContainer'
import StudentSubmissionList from './StudentSubmissionList'
import StudentSubmissionAddForm from './StudentSubmissionAddForm'
import withLocalize from '../../util/tieredLocalize'

const StudentSubmissionContainerComponent = ({ translate }) => (
  <div>
    <CardContainer title={translate('card_title')}>
      <StudentSubmissionAddForm />
      <StudentSubmissionList />
    </CardContainer>
  </div>
)

StudentSubmissionContainerComponent.propTypes = {
  translate: func.isRequired
}

export default withLocalize('Student.StudentSubmissionContainer')(StudentSubmissionContainerComponent)
