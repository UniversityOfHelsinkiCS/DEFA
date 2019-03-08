import React from 'react'
import { shape, string } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Card, CardContent, CardHeader } from '@material-ui/core'
import SubmissionApproveMutation from './SubmissionApproveMutation'
import { parseClasses, ISODateString } from '../../util/propTypes'
import parseDate from '../../util/parseDate'

const styles = {
  card: {
    margin: '8px'
  }
}

const SubmissionSearchResultSubmissionComponent = ({ submission, classes }) => (
  <Card className={classes.card}>
    <CardHeader
      title={parseDate(submission.date)}
    />
    <CardContent>
      <Typography variant="h6">Koski url</Typography>
      <Typography>
        <a
          href={submission.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {submission.url}
        </a>
      </Typography>
    </CardContent>
    {submission.comment.length > 0 ? (
      <CardContent>
        <Typography variant="h6">Additional information</Typography>
        <Typography>{submission.comment}</Typography>
      </CardContent>
    ) : null}
    <CardContent>
      <Typography variant="h6">Approval status</Typography>
      <SubmissionApproveMutation submission={submission} />
    </CardContent>
  </Card>
)

SubmissionSearchResultSubmissionComponent.propTypes = {
  submission: shape({
    url: string.isRequired,
    comment: string.isRequired,
    date: ISODateString.isRequired
  }).isRequired,
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(SubmissionSearchResultSubmissionComponent)
