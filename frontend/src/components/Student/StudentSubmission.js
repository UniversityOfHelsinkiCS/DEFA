import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { string } from 'prop-types'

export const AddSubmissionText = 'Add Submission'

export const EditSubmissionText = 'Edit Submission'

export const StudentSubmissionComponent = ({ submission }) => {
  if (!submission) {
    return <Button>{AddSubmissionText}</Button>
  }
  return (
    <Typography variant="h6">
      {submission.url}
      {EditSubmissionText}
    </Typography>
  )
}

StudentSubmissionComponent.propTypes = {
  submission: string //eslint-disable-line
}

export default StudentSubmissionComponent
