import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, CircularProgress } from '@material-ui/core'
import { Query } from 'react-apollo'
import CreditTable from '../CreditTable'
import { getMyUploads } from '../../util/queries/getCredits'
import { parseClasses } from '../../util/propTypes'

const styles = {
  anomaly: {
    textAlign: 'center'
  }
}

const parseCredits = data => {
  if (!data) {
    return []
  }
  return data.map(
    credit => ({ ...credit, teacher: `${credit.teacher.name} ${credit.teacher.email}` })
  )
}

const QueryLoading = () => <div><CircularProgress /></div>

const QueryError = () => <div><Typography>Error</Typography></div>

const TeacherCreditContainerComponent = ({ classes }) => (
  <div style={{ margin: '40px 25px 0px 40px' }}>
    <Query query={getMyUploads}>
      {({ loading, error, data }) => {
        try {
          if (loading) {
            return <QueryLoading className={classes.anomaly} />
          }
          if (error) {
            return <QueryError className={classes.anomaly} />
          }
          const credits = parseCredits(data.myUploads)
          if (credits.length === 0) {
            return <Typography variant="body1">You have not uploaded yet any credits</Typography>
          }
          return <CreditTable credits={credits} />
        } catch (e) {
          return <QueryError className={classes.anomaly} />
        }
      }}
    </Query>
  </div>
)

TeacherCreditContainerComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(TeacherCreditContainerComponent)
