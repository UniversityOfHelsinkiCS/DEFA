import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Card, CardContent, CardHeader, CircularProgress } from '@material-ui/core'
import { Query } from 'react-apollo'
import { secondary } from '../../common/colors'
import { getMyCredits } from '../../util/queries/getCredits'
import { parseClasses } from '../../util/propTypes'
import CreditT from '../CreditTable'

const styles = {
  cardHeader: {
    backgroundColor: secondary.main
  },
  anomaly: {
    textAlign: 'center'
  }
}

const StudentCreditsComponent = ({ classes }) => (
  <div>
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title="DEFA Credits"
        titleTypographyProps={{
          align: 'center'
        }}
      />
      <CardContent>
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
            const credits = data.me.identifiers.reduce(
              (acc, curr) => (curr.credits ? [...acc, ...curr.credits] : acc),
              []
            ).map(
              credit => ({ ...credit, teacher: `${credit.teacher.name} ${credit.teacher.email}` })
            )
            return <CreditT credits={credits} />
          }}
        </Query>
      </CardContent>
    </Card>
  </div>
)

StudentCreditsComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(StudentCreditsComponent)
