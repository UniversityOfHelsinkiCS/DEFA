import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withLocalize } from 'react-localize-redux'
import { Typography, Card, CardHeader, CardContent } from '@material-ui/core'
import { shape, string, bool, func } from 'prop-types'
import DeleteSubmission from './DeleteSubmission'
import SubmissionAutoParse, { context } from '../SubmissionAutoParse'
import './StudentSubmission.css'
import { parseClasses, ISODateString } from '../../util/propTypes'
import parseDate from '../../util/parseDate'

export const AddSubmissionText = 'Add Submission'
export const EditSubmissionText = 'Edit Submission'

const { STUDENT_SUBMISSIONS } = context
const TRANSLATION_BASE = 'Student.StudentSubmission'
const styles = {
  card: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  updated: {
    animationName: 'new',
    animationDuration: '2s'
  },
  deleteButtonContainer: {
    marginTop: '10px'
  }
}

export const StudentSubmissionComponent = ({ submission, classes, translate: baseTranslate }) => {
  const translate = id => baseTranslate(`${TRANSLATION_BASE}.${id}`)
  return (
    <Card className={classes.card}>
      <CardHeader
        className={submission.updated ? classes.updated : null}
        title={parseDate(submission.date)}
      />
      <CardContent className={submission.updated ? classes.updated : null}>
        <Typography variant="h6">
          <span>{`${translate('url')}: `}</span>
          <a href={submission.url} target="_blank" rel="noopener noreferrer">{submission.url}</a>
        </Typography>
        <SubmissionAutoParse submissionID={submission.id} context={STUDENT_SUBMISSIONS} />
        {submission.comment.length > 0 ? (
          <div>
            <Typography variant="h6">{`${translate('comment')}:`}</Typography>
            <Typography>{submission.comment}</Typography>
          </div>
        ) : null}
        <div className={classes.deleteButtonContainer}>
          <DeleteSubmission id={submission.id} />
        </div>
      </CardContent>
    </Card>
  )
}

StudentSubmissionComponent.propTypes = {
  classes: parseClasses(styles).isRequired,
  submission: shape({
    url: string.isRequired,
    date: ISODateString.isRequired,
    comment: string.isRequired,
    updated: bool
  }).isRequired,
  translate: func.isRequired
}

export default withStyles(styles)(withLocalize(StudentSubmissionComponent))
