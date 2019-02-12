import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { shape, string } from 'prop-types'

export const AddSubmissionText = 'Add Submission'

export const EditSubmissionText = 'Edit Submission'

export const StudentSubmissionComponent = ({ submission }) => {
  if (!submission) {
    return <Button>{AddSubmissionText}</Button>
  }
  return (
    <div>
      <Typography variant="h6">
        {submission.url}
      </Typography>
      <Button>{EditSubmissionText}</Button>
    </div>
  )
}

StudentSubmissionComponent.propTypes = {
  submission: shape({
    url: string.isRequired
  }).isRequired
}

export default StudentSubmissionComponent
