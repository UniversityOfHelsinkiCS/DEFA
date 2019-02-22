import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { Typography, Grid } from '@material-ui/core'
import CardContainer from '../Student/CardContainer'

export const SubmissionSearchResultComponent = ({ submissions }) => (
  <Grid container spacing={32}>
    {submissions.map(submission => {
      const title = `${submission.user.name} ${submission.user.studentNumber}`
      return (
        <Grid
          key={submission.id}
          item
          xs={12}
          lg={3}
          md={6}
          sm={12}
        >
          <CardContainer
            title={title}
          >
            <div>
              <Typography>
                <span>Koski url: </span>
                <a href={submission.url}>{submission.url}</a>
              </Typography>
            </div>
          </CardContainer>
        </Grid>
      )
    })}
  </Grid>
)

SubmissionSearchResultComponent.propTypes = {
  submissions: arrayOf(shape({
    id: string.isRequired,
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