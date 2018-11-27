import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, CircularProgress } from '@material-ui/core'
import { Query } from 'react-apollo'
import { getMyCredits } from '../../util/queries/getCredits'
import { parseClasses } from '../../util/propTypes'
import CardContainer from './CardContainer'
import StudentCreditList from './StudentCreditList'

const styles = {
  anomaly: {
    textAlign: 'center'
  }
}

const parseCredits = identifiers => {
  if (!identifiers) {
    return []
  }
  return identifiers.reduce(
    (acc, curr) => (curr.credits ? [...acc, ...curr.credits] : acc),
    []
  ).map(
    credit => ({ ...credit, teacher: `${credit.teacher.name} ${credit.teacher.email}` })
  )
}

const cardTitle = 'Your DEFA Credits'

const QueryLoading = () => <div><CircularProgress /></div>

// TODO: proper error message
const QueryError = () => <div><Typography>Error</Typography></div>

const StudentCreditContainerComponent = ({ classes }) => (
  <div>
    <CardContainer title={cardTitle}>
      <Query query={getMyCredits}>
        {({ loading, error, data }) => {
          try {
            if (loading) {
              return <QueryLoading className={classes.anomaly} />
            }
            if (error) {
              return <QueryError className={classes.anomaly} />
            }
            const credits = parseCredits(data.me.identifiers)
            return <StudentCreditList credits={credits} />
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
