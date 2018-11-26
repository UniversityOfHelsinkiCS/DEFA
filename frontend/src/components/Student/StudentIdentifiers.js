import React from 'react'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, CircularProgress, Button } from '@material-ui/core'
import { getMyIdentifiers } from '../../util/queries/getIdentifiers'
import { parseClasses } from '../../util/propTypes'
import CardContainer from './CardContainer'

const styles = {
  anomaly: {
    textAlign: 'center'
  }
}

const cardTitle = 'Your Universities'

const StudentIdentifiersComponent = ({ classes }) => (
  <div>
    <CardContainer title={cardTitle}>
      <Query query={getMyIdentifiers}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div className={classes.anomaly}><CircularProgress /></div>
          }
          if (error || !data.me) {
            // TODO: error message
            return <div className={classes.anomaly}>Error</div>
          }
          const { identifiers } = data.me
          return (
            <List>
              {identifiers.map(identifier => (
                <ListItem key={identifier.university}>
                  <ListItemText
                    primary={identifier.university}
                    secondary={identifier.student_number}
                  />
                </ListItem>
              ))}
              <ListItem>
                <Button
                  type="button"
                  variant="outlined"
                  disabled
                >
                  Link another university account
                </Button>
              </ListItem>
            </List>
          )
        }}
      </Query>
    </CardContainer>
  </div>
)

StudentIdentifiersComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(StudentIdentifiersComponent)
