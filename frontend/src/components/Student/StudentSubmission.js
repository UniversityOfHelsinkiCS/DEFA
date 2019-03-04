import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, Card, CardHeader, CardContent } from '@material-ui/core'
import { shape, string, bool } from 'prop-types'
import './StudentSubmission.css'
import { parseClasses, approval, ISODateString } from '../../util/propTypes'
import parseDate from '../../util/parseDate'

export const AddSubmissionText = 'Add Submission'

export const EditSubmissionText = 'Edit Submission'

const pickColor = (classes, approvalText) => {
  switch (approvalText) {
    case 'PENDING':
      return classes.pending
    case 'APPROVED':
      return classes.approved
    case 'REJECTED':
      return classes.rejected
    default:
      return null
  }
}

const styles = {
  card: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  updated: {
    animationName: 'new',
    animationDuration: '2s'
  },
  pending: {
    color: 'orange'
  },
  approved: {
    color: 'green'
  },
  rejected: {
    color: 'red'
  }
}

export const StudentSubmissionComponent = ({ submission, classes }) => {
  if (!submission) {
    return <Button>{AddSubmissionText}</Button>
  }
  return (
    <Card className={classes.card}>
      <CardHeader
        className={submission.updated ? classes.updated : null}
        title={parseDate(submission.date)}
      />
      <CardContent className={submission.updated ? classes.updated : null}>
        <Typography variant="h6">
          <span>Koski url: </span>
          <span>{submission.url}</span>
        </Typography>
        <Typography variant="h6">
          <span>Approval status: </span>
          <span className={pickColor(classes, submission.approval)}>{submission.approval}</span>
        </Typography>
      </CardContent>
    </Card>
  )
}

StudentSubmissionComponent.propTypes = {
  classes: parseClasses(styles).isRequired,
  submission: shape({
    url: string.isRequired,
    date: ISODateString.isRequired,
    approval: approval.isRequired,
    updated: bool
  }).isRequired
}

export default withStyles(styles)(StudentSubmissionComponent)
