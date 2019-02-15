import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import { shape, string, bool } from 'prop-types'
import './StudentSubmission.css'
import { parseClasses } from '../../util/propTypes'

export const AddSubmissionText = 'Add Submission'

export const EditSubmissionText = 'Edit Submission'

const styles = {
  updated: {
    animationName: 'new',
    animationDuration: '2s'
  }
}

export const StudentSubmissionComponent = ({ submission, classes }) => {
  if (!submission) {
    return <Button>{AddSubmissionText}</Button>
  }
  return (
    <div
      className={submission.updated ? classes.updated : null}
    >
      <Typography variant="h6">
        {submission.url}
      </Typography>
      <Button>{EditSubmissionText}</Button>
    </div>
  )
}

StudentSubmissionComponent.propTypes = {
  classes: parseClasses(styles).isRequired,
  submission: shape({
    url: string.isRequired,
    updated: bool
  }).isRequired
}

export default withStyles(styles)(StudentSubmissionComponent)
