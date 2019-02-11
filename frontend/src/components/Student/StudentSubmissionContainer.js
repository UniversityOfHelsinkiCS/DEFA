import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { string } from 'prop-types'
import { Typography, CircularProgress } from '@material-ui/core'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import { getMySubmission } from '../../util/queries/getSubmissions'
import { parseClasses } from '../../util/propTypes'
import CardContainer from './CardContainer'
import StudentSubmission from './StudentSubmission'

const styles = {
  anomaly: {
    textAlign: 'center'
  }
}

const cardTitle = 'Your Submission'

const QueryLoading = () => <div><CircularProgress /></div>

// TODO: proper error message
const QueryError = () => <div><Typography>Error</Typography></div>

const StudentSubmissionContainer = ({ classes, token }) => (
  <div>
    <CardContainer title={cardTitle}>
      <Query query={getMySubmission} variables={{ token }}>
        {({ loading, error, data }) => {
          try {
            if (loading) {
              return <QueryLoading className={classes.anomaly} />
            }
            if (error) {
              return <QueryError className={classes.anomaly} />
            }
            const { submission } = data.authenticate.me
            return <StudentSubmission submission={submission} />
          } catch (e) {
            return <QueryError className={classes.anomaly} />
          }
        }}
      </Query>
    </CardContainer>
  </div>
)

StudentSubmissionContainer.propTypes = {
  classes: parseClasses(styles).isRequired,
  token: string.isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

export default connect(mapStateToProps, null)(withStyles(styles)(StudentSubmissionContainer))
