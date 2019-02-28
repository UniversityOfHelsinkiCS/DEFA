import React from 'react'
import { shape, string } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Card, CardContent, CardHeader } from '@material-ui/core'
import SubmissionApproveMutation from './SubmissionApproveMutation'
import { parseClasses } from '../../util/propTypes'
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
      <Typography>
        <span>Koski url: </span>
        <a href={submission.url}>{submission.url}</a>
      </Typography>
    </CardContent>
    <CardContent>
      <Typography>Approval status</Typography>
      <SubmissionApproveMutation submission={submission} />
    </CardContent>
  </Card>
)

SubmissionSearchResultSubmissionComponent.propTypes = {
  submission: shape({
    url: string.isRequired,
    date: string.isRequired
  }).isRequired,
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(SubmissionSearchResultSubmissionComponent)
