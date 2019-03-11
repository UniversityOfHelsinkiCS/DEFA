import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, Card, CardHeader, CardContent } from '@material-ui/core'
import { shape, string, bool } from 'prop-types'
import DeleteSubmission from './DeleteSubmission'
import './StudentSubmission.css'
import { parseClasses, approval, ISODateString } from '../../util/propTypes'
import parseDate from '../../util/parseDate'

export const AddSubmissionText = 'Add Submission'

export const EditSubmissionText = 'Edit Submission'

const styles = {
  card: {
    marginTop: '10px',
    marginBottom: '10px'
  },
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
    <Card className={classes.card}>
      <CardHeader
        className={submission.updated ? classes.updated : null}
        title={parseDate(submission.date)}
      />
      <CardContent className={submission.updated ? classes.updated : null}>
        <Typography variant="h6">
          <span>Koski url: </span>
          <a href={submission.url} target="_blank" rel="noopener noreferrer">{submission.url}</a>
        </Typography>
        {submission.comment.length > 0 ? (
          <div>
            <Typography variant="h6">Additional information:</Typography>
            <Typography>{submission.comment}</Typography>
          </div>
        ) : null}
        <DeleteSubmission id={submission.id} />
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
    comment: string.isRequired,
    updated: bool
  }).isRequired
}

export default withStyles(styles)(StudentSubmissionComponent)
