import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { userProp } from '../../util/propTypes'
import CardContainer from './CardContainer'

const cardTitle = 'Your Info'

const StudentInformationComponent = ({ user }) => (
  <div>
    <CardContainer title={cardTitle}>
      <List>
        <ListItem>
          <ListItemText primary="name" secondary={user.attributes.cn} />
        </ListItem>
        <ListItem>
          <ListItemText primary="email" secondary={user.attributes.mail} />
        </ListItem>
      </List>
    </CardContainer>
  </div>
)

StudentInformationComponent.propTypes = {
  user: userProp.isRequired
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps)(StudentInformationComponent)
