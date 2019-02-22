import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { Typography, Grid } from '@material-ui/core'
import CardContainer from '../Student/CardContainer'

export const SubmissionSearchResultComponent = ({ users }) => (
  <Grid container spacing={32}>
    {users.map(user => {
      const title = `${user.name} ${user.studentNumber}`
      return (
        <Grid
          key={user.id}
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
              {user.submissions.map(submission => (
                <Typography key={submission.id}>
                  <span>Koski url: </span>
                  <a href={submission.url}>{submission.url}</a>
                </Typography>
              ))}
            </div>
          </CardContainer>
        </Grid>
      )
    })}
  </Grid>
)

SubmissionSearchResultComponent.propTypes = {
  users: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired,
    studentNumber: string.isRequired,
    submissions: arrayOf(shape({
      id: string.isRequired,
      url: string.isRequired
    })).isRequired
  })).isRequired
}

const mapStateToProps = ({ submissionSearch }) => ({
  users: submissionSearch.results
})

export default connect(mapStateToProps, null)(SubmissionSearchResultComponent)
