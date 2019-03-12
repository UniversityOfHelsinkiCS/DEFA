import React from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { userProp } from '../../util/propTypes'
import CardContainer from './CardContainer'

const TRANSLATE_BASE = 'Student.StudentInformation'

export const StudentInformationComponent = ({ user, translate: baseTranslate }) => {
  const translate = id => baseTranslate(`${TRANSLATE_BASE}.${id}`)
  return (
    <div>
      <CardContainer title={translate('card_title')}>
        <List>
          <ListItem>
            <ListItemText
              primary={translate('name')}
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
              primary={translate('email')}
              primaryTypographyProps={{
                variant: 'subtitle1'
              }}
              secondary={user.email}
              secondaryTypographyProps={{
                variant: 'subtitle2'
              }}
            />
          </ListItem>
        </List>
      </CardContainer>
    </div>
  )
}

StudentInformationComponent.propTypes = {
  user: userProp.isRequired,
  translate: func.isRequired
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(
  mapStateToProps,
  null
)(
  withLocalize(StudentInformationComponent)
)
