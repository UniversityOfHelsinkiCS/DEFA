import React from 'react'
import { shape, string } from 'prop-types'
import { Typography } from '@material-ui/core'
import SubmissionApproveMutation from './SubmissionApproveMutation'

const SubmissionSearchResultSubmissionComponent = ({ submission }) => (
  <div>
    <Typography>
      <span>Koski url: </span>
      <a href={submission.url}>{submission.url}</a>
    </Typography>
    <SubmissionApproveMutation submission={submission} />
  </div>
)

SubmissionSearchResultSubmissionComponent.propTypes = {
  submission: shape({
    url: string.isRequired
  }).isRequired
}

export default SubmissionSearchResultSubmissionComponent
