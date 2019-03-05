import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import CardContainer from '../Student/CardContainer'
import SubmissionSearchResultSubmission from './SubmissionSearchResultSubmission'

const hasSubmissionsFilter = user => user.submissions.length > 0
const inputsFilter = inputs => user => Object.entries(inputs).reduce(
  (acc, [key, value]) => acc && user[key].toLowerCase().includes(value.toLowerCase()),
  true
)

export const SubmissionSearchResultComponent = ({ users, inputs }) => {
  const filteredUsers = users.filter(hasSubmissionsFilter).filter(inputsFilter(inputs))
  return (
    <Grid container spacing={32}>
      {filteredUsers.map(user => {
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
                  <SubmissionSearchResultSubmission
                    key={submission.id}
                    submission={submission}
                  />
                ))}
              </div>
            </CardContainer>
          </Grid>
        )
      })}
    </Grid>
  )
}

SubmissionSearchResultComponent.propTypes = {
  users: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired,
    studentNumber: string.isRequired,
    username: string.isRequired,
    cn: string.isRequired,
    submissions: arrayOf(shape({
      id: string.isRequired,
      url: string.isRequired
    })).isRequired
  })).isRequired,
  inputs: shape({
    cn: string,
    studentNumber: string,
    username: string
  }).isRequired
}

const mapStateToProps = ({ submissionSearch }) => ({
  users: submissionSearch.results,
  inputs: submissionSearch.inputs
})

export default connect(mapStateToProps, null)(SubmissionSearchResultComponent)
