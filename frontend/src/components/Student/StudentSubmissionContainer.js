import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, CircularProgress } from '@material-ui/core'
import { Query } from 'react-apollo'
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

const StudentCreditContainerComponent = ({ classes }) => (
  <div>
    <CardContainer title={cardTitle}>
      <Query query={getMySubmission}>
        {({ loading, error, data }) => {
          try {
            if (loading) {
              return <QueryLoading className={classes.anomaly} />
            }
            if (error) {
              return <QueryError className={classes.anomaly} />
            }
            const { submission } = data.me
            return <StudentSubmission submission={submission} />
          } catch (e) {
            return <QueryError className={classes.anomaly} />
          }
        }}
      </Query>
    </CardContainer>
  </div>
)

StudentCreditContainerComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(StudentCreditContainerComponent)
