import React from 'react'
import { func } from 'prop-types'
import { withLocalize } from 'react-localize-redux'
import CardContainer from './CardContainer'
import StudentSubmissionList from './StudentSubmissionList'
import StudentSubmissionAddForm from './StudentSubmissionAddForm'

const TRANSLATION_BASE = 'Student.StudentSubmissionContainer'

const StudentSubmissionContainerComponent = ({ translate: baseTranslate }) => {
  const translate = id => baseTranslate(`${TRANSLATION_BASE}.${id}`)
  return (
    <div>
      <CardContainer title={translate('card_title')}>
        <StudentSubmissionAddForm />
        <StudentSubmissionList />
      </CardContainer>
    </div>
  )
}

StudentSubmissionContainerComponent.propTypes = {
  translate: func.isRequired
}

export default withLocalize(StudentSubmissionContainerComponent)
