import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, CircularProgress } from '@material-ui/core'
import { Query } from 'react-apollo'
import { getMyCredits } from '../../util/queries/getCredits'
import { parseClasses } from '../../util/propTypes'
import CreditT from '../CreditTable'
import CardContainer from './CardContainer'

const styles = {
  anomaly: {
    textAlign: 'center'
  }
}

const parseCredits = data => data.me.identifiers.reduce(
  (acc, curr) => (curr.credits ? [...acc, ...curr.credits] : acc),
  []
).map(
  credit => ({ ...credit, teacher: `${credit.teacher.name} ${credit.teacher.email}` })
)

const cardTitle = 'Your DEFA Credits'

const StudentCreditsComponent = ({ classes }) => (
  <div>
    <CardContainer title={cardTitle}>
      <Query query={getMyCredits}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div className={classes.anomaly}><CircularProgress /></div>
          }
          if (error || !data.me) {
            // TODO: error message
            return <div className={classes.anomaly}><Typography>Error</Typography></div>
          }
          if (!data.me.identifiers) {
            return (
              <div className={classes.anomaly}>
                <Typography>You have no credits.</Typography>
              </div>
            )
          }
          const credits = parseCredits(data)
          return <CreditT credits={credits} />
        }}
      </Query>
    </CardContainer>
  </div>
)

StudentCreditsComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(StudentCreditsComponent)
