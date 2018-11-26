import React from 'react'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, CircularProgress } from '@material-ui/core'
import { secondary } from '../../common/colors'
import { getMyIdentifiers } from '../../util/queries/getIdentifiers'
import { parseClasses } from '../../util/propTypes'

const styles = {
  cardHeader: {
    backgroundColor: secondary.main
  },
  anomaly: {
    textAlign: 'center'
  }
}

const StudentIdentifiersComponent = ({ classes }) => (
  <div>
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title="Universities"
        titleTypographyProps={{
          align: 'center'
        }}
      />
      <CardContent>
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
              </List>
            )
          }}
        </Query>
      </CardContent>
    </Card>
  </div>
)

StudentIdentifiersComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(StudentIdentifiersComponent)
