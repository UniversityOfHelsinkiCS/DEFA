import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import CardContainer from '../Student/CardContainer'

const SubmissionSearchResultComponent = ({ submissions }) => (
  <div>
    {submissions.map(submission => {
      const title = `${submission.user.name} ${submission.user.studentNumber}`
      return (
        <CardContainer
          key={submission.id}
          title={title}
        >
          <div>
            <Typography>
              <span>Koski url:</span>
              <a href={submission.url}>{submission.url}</a>
            </Typography>
          </div>
        </CardContainer>
      )
    })}
  </div>
)

SubmissionSearchResultComponent.propTypes = {
  submissions: arrayOf(shape({
    url: string.isRequired,
    user: shape({
      name: string.isRequired,
      studentNumber: string.isRequired
    }).isRequired
  })).isRequired
}

const mapStateToProps = ({ submissionSearch }) => ({
  submissions: submissionSearch.results
})

export default connect(mapStateToProps, null)(SubmissionSearchResultComponent)
