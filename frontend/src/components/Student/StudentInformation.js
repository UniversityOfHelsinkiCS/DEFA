import React from 'react'
import { connect } from 'react-redux'
import { Card, List, ListItem, ListItemText } from '@material-ui/core'
import { userProp } from '../../util/propTypes'

const StudentInformationComponent = ({ user }) => (
  <div>
    <Card>
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
  user: userProp.isRequired
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps)(StudentInformationComponent)
