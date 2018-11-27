import React from 'react'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { getMyIdentifiers } from '../../util/queries/getIdentifiers'
import { parseClasses } from '../../util/propTypes'
import CardContainer from './CardContainer'
import StudentIdentifierList from './StudentIdentifierList'

const styles = {
  anomaly: {
    textAlign: 'center'
  }
}

const cardTitle = 'Your Universities'

const QueryLoading = () => <div><CircularProgress /></div>

// TODO: proper error message
const QueryError = () => <div>Error</div>

const StudentIdentifierContainerComponent = ({ classes }) => (
  <div>
    <CardContainer title={cardTitle}>
      <Query query={getMyIdentifiers}>
        {({ loading, error, data }) => {
          try {
            if (loading) {
              return <QueryLoading className={classes.anomaly} />
            }
            if (error) {
              return <QueryError className={classes.anomaly} />
            }
            const { identifiers } = data.me
            return <StudentIdentifierList identifiers={identifiers} />
          } catch (e) {
            return <QueryError className={classes.anomaly} />
          }
        }}
      </Query>
    </CardContainer>
  </div>
)

StudentIdentifierContainerComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(StudentIdentifierContainerComponent)
