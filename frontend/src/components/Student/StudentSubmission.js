import React from 'react'
import { Typography } from '@material-ui/core'
import { string } from 'prop-types'

export const noCreditsMessage = 'You have no credits.'

const StudentSubmission = ({ submission }) => {
  if (!submission) {
    return <Typography variant="h6"> Add submission here</Typography>
  }
  return (
    <Typography variant="h6">
      {submission}
      and edit
    </Typography>
  )
}

StudentSubmission.propTypes = {
  submission: string //eslint-disable-line
}

export default StudentSubmission
