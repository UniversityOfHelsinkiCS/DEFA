import React from 'react'
import { shape, string, func, number } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Card, CardContent, CardHeader } from '@material-ui/core'
import SubmissionApproveMutation from './SubmissionApproveMutation'
import SubmissionAutoParse, { context } from '../SubmissionAutoParse'
import { parseClasses } from '../../util/propTypes'
import parseDate from '../../util/parseDate'
import withLocalize from '../../util/tieredLocalize'

const { SUBMISSION_SEARCH } = context

const styles = {
  card: {
    margin: '8px'
  }
}

const SubmissionSearchResultSubmissionComponent = ({ submission, classes, translate }) => (
  <Card className={classes.card}>
    <CardHeader
      title={parseDate(submission.date)}
    />
    <CardContent>
      <Typography variant="h6">{translate('url')}</Typography>
      <Typography>
        <a
          href={submission.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {submission.url}
        </a>
      </Typography>
      <SubmissionAutoParse submissionID={submission.id} context={SUBMISSION_SEARCH} />
    </CardContent>
    {submission.comment.length > 0 ? (
      <CardContent>
        <Typography variant="h6">{translate('comment')}</Typography>
        <Typography>{submission.comment}</Typography>
      </CardContent>
    ) : null}
    <CardContent>
      <Typography variant="h6">{translate('approval')}</Typography>
      <SubmissionApproveMutation submission={submission} />
    </CardContent>
  </Card>
)

SubmissionSearchResultSubmissionComponent.propTypes = {
  submission: shape({
    url: string.isRequired,
    comment: string.isRequired,
    date: number.isRequired
  }).isRequired,
  classes: parseClasses(styles).isRequired,
  translate: func.isRequired
}

export default withStyles(styles)(
  withLocalize('SubmissionSearch.SubmissionSearchResultSubmission')(SubmissionSearchResultSubmissionComponent)
)
