import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardHeader, List, ListItem, ListItemText } from '@material-ui/core'
import { secondary } from '../../common/colors'
import { userProp, parseClasses } from '../../util/propTypes'

const styles = {
  cardHeader: {
    backgroundColor: secondary.main
  }
}

const StudentInformationComponent = ({ user, classes }) => (
  <div>
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title="Info"
        titleTypographyProps={{
          align: 'center'
        }}
      />
      <List>
        <ListItem>
          <ListItemText primary="name" secondary={user.attributes.cn} />
        </ListItem>
        <ListItem>
          <ListItemText primary="email" secondary={user.attributes.mail} />
        </ListItem>
      </List>
    </Card>
  </div>
)

StudentInformationComponent.propTypes = {
  classes: parseClasses(styles).isRequired,
  user: userProp.isRequired
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps)(withStyles(styles)(StudentInformationComponent))
