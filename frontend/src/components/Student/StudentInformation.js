import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { userProp } from '../../util/propTypes'
import CardContainer from './CardContainer'

const cardTitle = 'Your Info'

export const StudentInformationComponent = ({ user }) => (
  <div>
    <CardContainer title={cardTitle}>
      <List>
        <ListItem>
          <ListItemText
            primary="name"
            primaryTypographyProps={{
              variant: 'subtitle1'
            }}
            secondary={user.name}
            secondaryTypographyProps={{
              variant: 'subtitle2'
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="email"
            primaryTypographyProps={{
              variant: 'subtitle1'
            }}
            secondary={user.attributes.mail}
            secondaryTypographyProps={{
              variant: 'subtitle2'
            }}
          />
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
