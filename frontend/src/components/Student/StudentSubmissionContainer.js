import React from 'react'
import CardContainer from './CardContainer'
import StudentSubmissionList from './StudentSubmissionList'
import StudentSubmissionAddForm from './StudentSubmissionAddForm'

const CARD_TITLE = 'Your Submission'

const StudentSubmissionContainer = () => (
  <div>
    <CardContainer title={CARD_TITLE}>
      <StudentSubmissionAddForm />
      <StudentSubmissionList />
    </CardContainer>
  </div>
)

export default StudentSubmissionContainer
