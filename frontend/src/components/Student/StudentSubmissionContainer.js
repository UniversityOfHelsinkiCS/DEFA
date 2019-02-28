import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { string, func } from 'prop-types'
import { Typography, CircularProgress } from '@material-ui/core'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { getMySubmissions } from '../../util/queries/getSubmissions'
import { parseClasses } from '../../util/propTypes'
import CardContainer from './CardContainer'
import StudentSubmissionList from './StudentSubmissionList'
import StudentSubmissionAddForm from './StudentSubmissionAddForm'
import { getStudentSubmissions } from '../../util/actions/submission'

const styles = {
  anomaly: {
    textAlign: 'center'
  }
}

const cardTitle = 'Your Submission'

const QueryLoading = () => <div><CircularProgress /></div>

// TODO: proper error message
const QueryError = () => <div><Typography>Error</Typography></div>

const StudentSubmissionContainer = ({ classes, token, dispatchGetStudentSubmissions }) => {
  const onCompleted = data => {
    const { submissions } = data.authenticate.me
    dispatchGetStudentSubmissions(submissions)
  }
  return (
    <div>
      <CardContainer title={cardTitle}>
        <Query
          query={getMySubmissions}
          variables={{ token }}
          onCompleted={onCompleted}
        >
          {({ loading, error }) => {
            try {
              if (loading) {
                return <QueryLoading className={classes.anomaly} />
              }
              if (error) {
                return <QueryError className={classes.anomaly} />
              }
              return (
                <div>
                  <StudentSubmissionAddForm />
                  <StudentSubmissionList />
                </div>
              )
            } catch (e) {
              return <QueryError className={classes.anomaly} />
            }
          }}
        </Query>
      </CardContainer>
    </div>
  )
}

StudentSubmissionContainer.propTypes = {
  classes: parseClasses(styles).isRequired,
  token: string.isRequired,
  dispatchGetStudentSubmissions: func.isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

const mapDispatchToProps = {
  dispatchGetStudentSubmissions: getStudentSubmissions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StudentSubmissionContainer))
